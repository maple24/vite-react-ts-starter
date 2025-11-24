import { useState, useCallback } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { Progress, Button, Card, Space, Typography, Image } from 'antd'
import { InboxOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons'
import { toast } from '../common/Toast'

const { Text } = Typography

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  progress: number
  status: 'uploading' | 'done' | 'error'
}

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  maxFiles?: number
  multiple?: boolean
  onUpload?: (files: File[]) => Promise<void>
  onRemove?: (fileId: string) => void
}

export default function FileUpload({
  accept = 'image/*,application/pdf,.doc,.docx,.xls,.xlsx',
  maxSize = 10, // 10MB default
  maxFiles = 5,
  multiple = true,
  onUpload,
  onRemove
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const simulateUpload = useCallback(async (file: File): Promise<UploadedFile> => {
    const fileId = `${Date.now()}-${file.name}`
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading'
    }

    setUploadedFiles(prev => [...prev, newFile])

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === fileId ? { ...f, progress } : f
        )
      )
    }

    setUploadedFiles(prev =>
      prev.map(f =>
        f.id === fileId ? { ...f, status: 'done' as const } : f
      )
    )

    return newFile
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(rejection => {
        const errors = rejection.errors.map(e => e.message).join(', ')
        toast.error(`${rejection.file.name}: ${errors}`)
      })
    }

    // Check max files limit
    if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Process accepted files
    try {
      if (onUpload) {
        await onUpload(acceptedFiles)
      }

      // Simulate upload for each file
      for (const file of acceptedFiles) {
        await simulateUpload(file)
      }

      toast.success(`${acceptedFiles.length} file(s) uploaded successfully`)
    } catch {
      toast.error('Upload failed')
    }
  }, [uploadedFiles.length, maxFiles, onUpload, simulateUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, curr) => ({ ...acc, [curr.trim()]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    multiple,
    disabled: uploadedFiles.length >= maxFiles
  })

  const handleRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    if (onRemove) {
      onRemove(fileId)
    }
    toast.info('File removed')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const isImage = (type: string) => type.startsWith('image/')

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? '#1677ff' : '#d9d9d9'}`,
          borderRadius: '8px',
          padding: '3rem',
          textAlign: 'center',
          cursor: uploadedFiles.length >= maxFiles ? 'not-allowed' : 'pointer',
          backgroundColor: isDragActive ? '#f0f5ff' : '#fafafa',
          transition: 'all 0.3s'
        }}
      >
        <input {...getInputProps()} />
        <InboxOutlined style={{ fontSize: '48px', color: '#1677ff', marginBottom: '1rem' }} />
        <div>
          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '0.5rem' }}>
            {isDragActive ? 'Drop files here' : 'Click or drag files to upload'}
          </Text>
          <Text type="secondary">
            Support for {multiple ? 'multiple' : 'single'} file upload. Max size: {maxSize}MB per file.
            {uploadedFiles.length >= maxFiles && ` (Maximum ${maxFiles} files reached)`}
          </Text>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {uploadedFiles.map(file => (
            <Card
              key={file.id}
              size="small"
              style={{
                borderRadius: '8px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Preview */}
                {isImage(file.type) ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={60}
                    height={60}
                    style={{ borderRadius: '4px', objectFit: 'cover' }}
                    preview={{
                      mask: <EyeOutlined />
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '4px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}
                  >
                    📄
                  </div>
                )}

                {/* File Info */}
                <div style={{ flex: 1 }}>
                  <Text strong style={{ display: 'block' }}>
                    {file.name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {formatFileSize(file.size)}
                  </Text>

                  {/* Progress Bar */}
                  {file.status === 'uploading' && (
                    <Progress percent={file.progress} size="small" style={{ marginTop: '0.5rem' }} />
                  )}
                </div>

                {/* Actions */}
                <Space>
                  {file.status === 'done' && (
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = file.url
                        link.download = file.name
                        link.click()
                      }}
                    />
                  )}
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemove(file.id)}
                    disabled={file.status === 'uploading'}
                  />
                </Space>
              </div>
            </Card>
          ))}
        </Space>
      )}
    </Space>
  )
}

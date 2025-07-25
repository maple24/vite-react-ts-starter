import { Select } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useTranslation } from '../../../hooks/useTranslation'

const { Option } = Select

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

interface LanguageSwitcherProps {
  size?: 'small' | 'middle' | 'large'
  showFlag?: boolean
}

export default function LanguageSwitcher({ size = 'middle', showFlag = true }: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage } = useTranslation()

  const handleLanguageChange = (value: string) => {
    changeLanguage(value)
  }

  return (
    <Select
      value={currentLanguage}
      onChange={handleLanguageChange}
      size={size}
      style={{ minWidth: 120 }}
      suffixIcon={<GlobalOutlined />}
    >
      {languages.map(lang => (
        <Option key={lang.code} value={lang.code}>
          {showFlag && <span style={{ marginRight: 8 }}>{lang.flag}</span>}
          {lang.name}
        </Option>
      ))}
    </Select>
  )
}

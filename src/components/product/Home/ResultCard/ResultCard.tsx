import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface ResultCardProps {
  netSalary: string
}

const ResultCard = ({ netSalary }: ResultCardProps) => {
  const { t } = useTranslation()

  return (
    <Box bgcolor={'white'}>
      <Typography variant='body1'>{t('home.net_salary')}</Typography>
      <Typography variant='body2'>{netSalary}</Typography>
    </Box>
  )
}

export default ResultCard

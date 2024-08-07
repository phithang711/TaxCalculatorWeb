import { List, ListItem, ListItemText, Typography } from '@mui/material'
import { t } from 'i18next'
import { DefaultCurrencyFormatter } from '~/utils/CurrencyFormatters'

interface InsuranceProps {
  sicknessInsur?: string
  workAccidentInsur?: string
  maternityInsur?: string
  unemploymentInsur?: string
  retirementInsur?: string
  healthInsur?: string
  deathInsur?: string
}
interface ResultProps {
  employee: {
    netIncome?: string
    insurance?: InsuranceProps
    tax?: string
  }
  company: { insurance?: InsuranceProps; total?: string }
}
const ResultPanel = (props: ResultProps) => {
  const { employee, company } = props

  const employeeDetails = [
    {
      name: 'incomeTax',
      label: t('result_panel.income_tax'),
      desc: t('result_panel.income_tax_desc'),
      info: employee?.tax,
    },
    {
      name: 'sicknessInsur',
      label: t('result_panel.insurances.sickness_insurance'),
      desc: t('result_panel.insurances.sickness_insur_desc'),
      info: employee?.insurance?.sicknessInsur,
    },
    {
      name: 'workAccidentInsur',
      label: t('result_panel.insurances.work_accident_insurance'),
      desc: t('result_panel.insurances.work_accident_insur_desc'),
      info: employee?.insurance?.workAccidentInsur,
    },
    {
      name: 'maternityInsur',
      label: t('result_panel.insurances.maternity_insurance'),
      desc: t('result_panel.insurances.maternity_insur_desc'),
      info: employee?.insurance?.maternityInsur,
    },
    {
      name: 'unemploymentInsur',
      label: t('result_panel.insurances.unemployment_insurance'),
      desc: t('result_panel.insurances.unemployment_insur_desc'),
      info: employee?.insurance?.unemploymentInsur,
    },
    {
      name: 'retirementInsur',
      label: t('result_panel.insurances.retirement_insurance'),
      desc: t('result_panel.insurances.retirement_insur_desc'),
      info: employee?.insurance?.retirementInsur,
    },
    {
      name: 'healthInsur',
      label: t('result_panel.insurances.health_insurance'),
      desc: t('result_panel.insurances.health_insur_desc'),
      info: employee?.insurance?.healthInsur,
    },
    {
      name: 'deathInsur',
      label: t('result_panel.insurances.death_insurance'),
      desc: t('result_panel.insurances.death_insur_desc'),
      info: employee?.insurance?.deathInsur,
    },
  ]

  const companyDetails = [
    {
      name: 'sicknessInsur',
      label: t('result_panel.insurances.sickness_insurance'),
      desc: t('result_panel.insurances.sickness_insur_desc'),
      info: company?.insurance?.sicknessInsur,
    },
    {
      name: 'workAccidentInsur',
      label: t('result_panel.insurances.work_accident_insurance'),
      desc: t('result_panel.insurances.work_accident_insur_desc'),
      info: company?.insurance?.workAccidentInsur,
    },
    {
      name: 'maternityInsur',
      label: t('result_panel.insurances.maternity_insurance'),
      desc: t('result_panel.insurances.maternity_insur_desc'),
      info: company?.insurance?.maternityInsur,
    },
    {
      name: 'unemploymentInsur',
      label: t('result_panel.insurances.unemployment_insurance'),
      desc: t('result_panel.insurances.unemployment_insur_desc'),
      info: company?.insurance?.unemploymentInsur,
    },
    {
      name: 'retirementInsur',
      label: t('result_panel.insurances.retirement_insurance'),
      desc: t('result_panel.insurances.retirement_insur_desc'),
      info: company?.insurance?.retirementInsur,
    },
    {
      name: 'healthInsur',
      label: t('result_panel.insurances.health_insurance'),
      desc: t('result_panel.insurances.health_insur_desc'),
      info: company?.insurance?.healthInsur,
    },
    {
      name: 'deathInsur',
      label: t('result_panel.insurances.death_insurance'),
      desc: t('result_panel.insurances.death_insur_desc'),
      info: company?.insurance?.deathInsur,
    },
  ]

  return (
    <>
      <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
        {t('result_panel.net_income')}
      </Typography>
      <Typography variant='h4' gutterBottom>
        {DefaultCurrencyFormatter(employee?.netIncome ?? '')}
      </Typography>
      <List disablePadding>
        {employeeDetails.map((item) => (
          <ListItem key={item.label} sx={{ py: 1, px: 0 }}>
            <ListItemText sx={{ mr: 2 }} primary={item.label} secondary={item.desc} />
            <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
              {DefaultCurrencyFormatter(item?.info ?? '')}
            </Typography>
          </ListItem>
        ))}
      </List>

      {/* Divider */}
      <hr style={{ margin: '20px 50% 20px 0px' }} />

      <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
        {t('result_panel.total_company_cost')}
      </Typography>
      <Typography variant='h4' gutterBottom>
        {DefaultCurrencyFormatter(company?.total ?? '')}
      </Typography>
      <List disablePadding>
        {companyDetails.map((item) => (
          <ListItem key={item.label} sx={{ py: 1, px: 0 }}>
            <ListItemText sx={{ mr: 2 }} primary={item.label} secondary={item.desc} />
            <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
              {DefaultCurrencyFormatter(item?.info ?? '')}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default ResultPanel

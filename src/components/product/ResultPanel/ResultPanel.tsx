import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { t } from 'i18next'
import { AnimatedCounter } from 'react-animated-counter'
import { useTheme } from '@mui/material/styles'
import TaxInfo from '~/types/taxCal/taxInfos'
import { DefaultCurrencyFormatter } from '~/utils/CurrencyFormatters'

const ResultPanel = (props: TaxInfo) => {
  const { employee } = props
  const theme = useTheme()

  const employeeDetails = [
    {
      name: 'incomeTax',
      label: t('result_panel.income_tax'),
      desc: t('result_panel.income_tax_desc'),
      info: employee?.tax,
    },
    // TODO: To Be Implemented if needed
    // {
    //   name: 'sicknessInsur',
    //   label: t('result_panel.insurances.sickness_insurance'),
    //   desc: t('result_panel.insurances.sickness_insur_desc'),
    //   info: employee?.insurance?.sicknessInsur,
    // },
    // {
    //   name: 'workAccidentInsur',
    //   label: t('result_panel.insurances.work_accident_insurance'),
    //   desc: t('result_panel.insurances.work_accident_insur_desc'),
    //   info: employee?.insurance?.workAccidentInsur,
    // },

    {
      name: 'unemploymentInsur',
      label: t('result_panel.insurances.unemployment_insurance'),
      desc: t('result_panel.insurances.unemployment_insur_desc'),
      info: employee?.insurance?.unemploymentInsurance,
    },
    {
      name: 'retirementInsur',
      label: t('result_panel.insurances.retirement_insurance'),
      desc: t('result_panel.insurances.retirement_insur_desc'),
      info: employee?.insurance?.socialInsurance,
    },
    {
      name: 'healthInsur',
      label: t('result_panel.insurances.health_insurance'),
      desc: t('result_panel.insurances.health_insur_desc'),
      info: employee?.insurance?.healthInsurance,
    },
  ]

  return (
    <>
      <Typography variant='h4' sx={{ color: 'text.secondary' }}>
        {t('result_panel.net_income')}
      </Typography>

      <Grid>
        <AnimatedCounter
          key={theme?.palette?.text?.primary}
          value={employee?.netIncome}
          fontSize={theme?.typography?.h4?.fontSize?.toString()}
          color={theme?.palette?.text?.primary}
          includeCommas={true}
          includeDecimals={false}
        />
      </Grid>
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
    </>
  )
}

export default ResultPanel

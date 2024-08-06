import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { useState } from 'react'
import ResultPanel from './ResultPanel'

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

export default function ResultPanelMobile(props: ResultProps) {
  const [open, setOpen] = useState(false)

  const { employee, company } = props

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role='presentation'>
      <IconButton onClick={toggleDrawer(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <ResultPanel employee={employee} company={company} />
    </Box>
  )

  return (
    <div>
      <Button variant='text' endIcon={<ExpandMoreRoundedIcon />} onClick={toggleDrawer(true)}>
        View details
      </Button>
      <Drawer open={open} anchor='top' onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {
  FormHelperText,
  FormControl,
  FormLabel,
  FormControlLabel,
} from '@mui/material'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import FormControl from '@mui/material/FormControl'
// import FormLabel from '@mui/material/FormLabel'
import Tab from '@mui/material/Tab'
import AddIcon from '@mui/icons-material/Add'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import DownloadIcon from '@mui/icons-material/Download'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

function App() {
  const regexNote = 'Supports regex, defaults to .*'
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />
  const [tableRules, setTableRules] = useState([{}])
  const [schemaRules, setSchemaRules] = useState([{}])
  const [catalogueRules, setCatalogueRules] = useState([{}])
  const [tableError, setTableError] = useState('')
  const [schemaError, setSchemaError] = useState('')
  const [catalogueError, setCatalogueError] = useState('')

  const privilegeOptions = [
    'SELECT',
    'INSERT',
    'DELETE',
    'UPDATE',
    'OWNERSHIP',
    'GRANT_SELECT',
  ]
  const handleAddTableRule = () => {
    // console.log(tableRules)
    if (
      !('tablePrivilege' in tableRules[tableRules.length - 1]) ||
      tableRules[tableRules.length - 1].tablePrivilege.length === 0
    ) {
      setTableError('Field cannot be empty')
    } else {
      setTableRules((prevRules) => [...prevRules, {}])
    }
  }

  const handleRemoveTableRule = () => {
    if (tableRules.length > 1) {
      setTableRules(tableRules.slice(0, -1))
    }
  }

  const handleAddSchemaRule = () => {
    if (
      !('schemaOwner' in schemaRules[schemaRules.length - 1]) ||
      schemaRules[schemaRules.length - 1].schemaOwner.length === 0
    ) {
      setSchemaError('Field cannot be empty')
    } else {
      setSchemaRules((prevRules) => [...prevRules, {}])
    }
  }

  const handleRemoveSchemaRule = () => {
    if (schemaRules.length > 1) {
      setSchemaRules(schemaRules.slice(0, -1))
    }
  }

  const handleAddCatalogueRule = () => {
    if (
      !('catalogueAllow' in catalogueRules[catalogueRules.length - 1]) ||
      catalogueRules[catalogueRules.length - 1].catalogueAllow.length === 0
    ) {
      setCatalogueError('Please select atleast one option')
    } else {
      setCatalogueRules((prevRules) => [...prevRules, {}])
    }
  }

  const handleRemoveCatalogueRule = () => {
    if (catalogueRules.length > 1) {
      setCatalogueRules(catalogueRules.slice(0, -1))
    }
  }

  const handleTableRuleChange = (index, field, value) => {
    const newRules = [...tableRules]
    newRules[index][field] = value
    setTableRules(newRules)
    // console.log(tableRules)
    // console.log(schemaRules)
    // console.log(Object.keys(schemaRules[schemaRules.length - 1]).length)
    // console.log(catalogueRules)
  }

  const handleSchemaRuleChange = (index, field, value) => {
    const newRules = [...schemaRules]
    newRules[index][field] = value
    setSchemaRules(newRules)
  }

  const handleCatalogueRuleChange = (index, field, value) => {
    const newRules = [...catalogueRules]
    newRules[index][field] = value
    setCatalogueRules(newRules)
  }
  function updateKeysInArrayOfObjectsToLowercaseAndTrim(arr, wordToTrim) {
    return arr.map((obj) => {
      const newObj = {}

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'string' && obj[key].trim() === '') {
            continue
          }
          const lowercasedKey = key.toLowerCase()
          const newKey = lowercasedKey.startsWith(wordToTrim.toLowerCase())
            ? lowercasedKey.substring(wordToTrim.length)
            : lowercasedKey
          if (newKey === 'name') {
            const finalKey = wordToTrim.toLowerCase()
            newObj[finalKey] = obj[key]
          } else {
            newObj[newKey] = obj[key]
          }
        }
      }

      return newObj
    })
  }
  const handleGenerateJSON = () => {
    let final_json = {}
    let newTableRules = tableRules
    let newSchemaRules = schemaRules
    let newCatalogueRules = catalogueRules
    // console.log(schemaRules)
    if (
      tableRules.length > 0 &&
      Object.keys(tableRules[tableRules.length - 1]).length === 0
    ) {
      newTableRules = tableRules.slice(0, -1)
    }
    if (
      schemaRules.length > 0 &&
      Object.keys(schemaRules[schemaRules.length - 1]).length === 0
    ) {
      newSchemaRules = schemaRules.slice(0, -1)
    }
    if (
      catalogueRules.length > 0 &&
      Object.keys(catalogueRules[catalogueRules.length - 1]).length === 0
    ) {
      newCatalogueRules = catalogueRules.slice(0, -1)
    }
    if (newTableRules.length !== 0) {
      final_json['table'] = newTableRules
    }
    if (newSchemaRules.length !== 0) {
      final_json['schema'] = newSchemaRules
    }
    if (newCatalogueRules.length !== 0) {
      final_json['catalogue'] = newCatalogueRules
    }
    if ('table' in final_json) {
      final_json['table'] = updateKeysInArrayOfObjectsToLowercaseAndTrim(
        final_json['table'],
        'table'
      )
    }
    if ('catalogue' in final_json) {
      final_json['catalogue'] = updateKeysInArrayOfObjectsToLowercaseAndTrim(
        final_json['catalogue'],
        'catalogue'
      )
    }
    if ('schema' in final_json) {
      final_json['schema'] = updateKeysInArrayOfObjectsToLowercaseAndTrim(
        final_json['schema'],
        'schema'
      )
    }

    const jsonData = JSON.stringify(final_json, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trinio-rules-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div
      className="App"
      style={{
        fontFamily: 'Montserrat',
        display: 'flex',
        border: '1px solid black',
        borderRadius: '15px',
        margin: '10vh 40vh 10vh 40vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '500px',
        overflow: 'auto',
      }}
    >
      <h2>Trinio Access Management</h2>
      <Button
        onClick={handleGenerateJSON}
        style={{ marginBottom: '16px' }}
        size="small"
        variant="contained"
        endIcon={<DownloadIcon />}
      >
        Download JSON
      </Button>

      <TabContext value={value} style={{ minWidth: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Table Rules" value="1" />
            <Tab label="Schema Rules" value="2" />
            <Tab label="Catalogue Rules" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {tableRules.map((rule, index) => (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  value={rule.tableUser}
                  onChange={(e) =>
                    handleTableRuleChange(index, 'tableUser', e.target.value)
                  }
                  placeholder={regexNote}
                  fullWidth
                  label="User"
                />
                <TextField
                  value={rule.tableRole}
                  onChange={(e) =>
                    handleTableRuleChange(index, 'tableRole', e.target.value)
                  }
                  placeholder={regexNote}
                  fullWidth
                  label="Role"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder={regexNote}
                  value={rule.tableCatalogue}
                  onChange={(e) =>
                    handleTableRuleChange(
                      index,
                      'tableCatalogue',
                      e.target.value
                    )
                  }
                  fullWidth
                  label="Catalogue"
                />
                <TextField
                  placeholder={regexNote}
                  value={rule.tableGroup}
                  onChange={(e) =>
                    handleTableRuleChange(index, 'tableGroup', e.target.value)
                  }
                  fullWidth
                  label="Group"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder={regexNote}
                  value={rule.tableSchema}
                  onChange={(e) =>
                    handleTableRuleChange(index, 'tableSchema', e.target.value)
                  }
                  fullWidth
                  label="Schema"
                />
                <TextField
                  placeholder={regexNote}
                  value={rule.tableName}
                  onChange={(e) =>
                    handleTableRuleChange(index, 'tableName', e.target.value)
                  }
                  fullWidth
                  label="Table"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={privilegeOptions}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  style={{ width: 500 }}
                  value={rule.tablePrivilege}
                  onChange={(e, newValue) =>
                    handleTableRuleChange(index, 'tablePrivilege', newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      error={!!tableError}
                      helperText={tableError}
                      required
                      {...params}
                      label="Privileges"
                    />
                  )}
                />
              </Box>
              <Divider style={{ margin: '30px' }} />
            </Box>
          ))}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              color="primary"
              onClick={handleAddTableRule}
              endIcon={<AddIcon />}
            >
              Add rule
            </Button>
            <Button
              onClick={handleRemoveTableRule}
              color="error"
              endIcon={<CloseIcon />}
            >
              Remove rule
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          {schemaRules.map((rule, index) => (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder={regexNote}
                  value={rule.schemaUser}
                  onChange={(e) =>
                    handleSchemaRuleChange(index, 'schemaUser', e.target.value)
                  }
                  fullWidth
                  label="User"
                />
                <TextField
                  placeholder={regexNote}
                  value={rule.schemaRole}
                  onChange={(e) =>
                    handleSchemaRuleChange(index, 'schemaRole', e.target.value)
                  }
                  fullWidth
                  label="Role"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder={regexNote}
                  value={rule.schemaCatalogue}
                  onChange={(e) =>
                    handleSchemaRuleChange(
                      index,
                      'schemaCatalogue',
                      e.target.value
                    )
                  }
                  fullWidth
                  label="Catalogue"
                />
                <TextField
                  placeholder={regexNote}
                  value={rule.schemaGroup}
                  onChange={(e) =>
                    handleSchemaRuleChange(index, 'schemaGroup', e.target.value)
                  }
                  fullWidth
                  label="Group"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder={regexNote}
                  value={rule.schemaName}
                  onChange={(e) =>
                    handleSchemaRuleChange(index, 'schemaName', e.target.value)
                  }
                  fullWidth
                  label="Schema"
                />
                <TextField
                  error={!!schemaError}
                  helperText={schemaError}
                  value={rule.schemaOwner}
                  placeholder="True/False"
                  onChange={(e) =>
                    handleSchemaRuleChange(index, 'schemaOwner', e.target.value)
                  }
                  required
                  fullWidth
                  label="Owner"
                />
              </Box>
              <Divider style={{ margin: '30px' }} />
            </Box>
          ))}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              color="primary"
              onClick={handleAddSchemaRule}
              endIcon={<AddIcon />}
            >
              Add rule
            </Button>
            <Button
              onClick={handleRemoveSchemaRule}
              color="error"
              endIcon={<CloseIcon />}
            >
              Remove rule
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value="3">
          {catalogueRules.map((rule, index) => (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder={regexNote}
                  value={rule.catalogueUser}
                  onChange={(e) =>
                    handleCatalogueRuleChange(
                      index,
                      'catalogueUser',
                      e.target.value
                    )
                  }
                  fullWidth
                  label="User"
                />
                <TextField
                  placeholder={regexNote}
                  value={rule.catalogueRole}
                  onChange={(e) =>
                    handleCatalogueRuleChange(
                      index,
                      'catalogueRole',
                      e.target.value
                    )
                  }
                  fullWidth
                  label="Role"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder={regexNote}
                  value={rule.catalogueGroup}
                  onChange={(e) =>
                    handleCatalogueRuleChange(
                      index,
                      'catalogueGroup',
                      e.target.value
                    )
                  }
                  fullWidth
                  label="Group"
                />
                <TextField
                  placeholder={regexNote}
                  value={rule.catalogueName}
                  onChange={(e) =>
                    handleCatalogueRuleChange(
                      index,
                      'catalogueName',
                      e.target.value
                    )
                  }
                  fullWidth
                  label="Catalogue"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <FormControl
                  fullWidth
                  style={{ display: 'flex', alignItems: 'center' }}
                  required
                  error={!!catalogueError}
                  // helperText={catalogueError}
                  value={rule.catalogueAllow}
                  onChange={(e) =>
                    handleCatalogueRuleChange(
                      index,
                      'catalogueAllow',
                      e.target.value
                    )
                  }
                >
                  <FormLabel fullWidth id="demo-row-radio-buttons-group-label">
                    Allow
                  </FormLabel>
                  <RadioGroup
                    value={rule.catalogueAllow}
                    onChange={(e) =>
                      handleCatalogueRuleChange(
                        index,
                        'catalogueAllow',
                        e.target.value
                      )
                    }
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="none"
                      control={<Radio />}
                      label="None"
                    />
                    <FormControlLabel
                      value="read-only"
                      control={<Radio />}
                      label="Read-only"
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                    />
                  </RadioGroup>
                  <FormHelperText id="my-helper-text">
                    {catalogueError}
                  </FormHelperText>
                </FormControl>
                {/* <TextField
                  error={!!catalogueError}
                  helperText={catalogueError}
                  value={rule.catalogueAllow}
                  onChange={(e) =>
                    handleCatalogueRuleChange(
                      index,
                      'catalogueAllow',
                      e.target.value
                    )
                  }
                  required
                  fullWidth
                  label="Allow"
                /> */}
              </Box>
              <Divider style={{ margin: '30px' }} />
            </Box>
          ))}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              color="primary"
              onClick={handleAddCatalogueRule}
              endIcon={<AddIcon />}
            >
              Add rule
            </Button>
            <Button
              onClick={handleRemoveCatalogueRule}
              color="error"
              endIcon={<CloseIcon />}
            >
              Remove rule
            </Button>
          </Box>
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default App

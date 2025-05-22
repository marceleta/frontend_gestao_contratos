import React, { useState, useEffect } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClientesForm = () => {
  const [tipoPessoa, setTipoPessoa] = useState('fisica');
  const [activeTab, setActiveTab] = useState(0);
  const [estados, setEstados] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    nome_fantasia: '',
    email: '',
    telefone: '',
    endereco: '',
    rua_casa: '',
    numero_casa: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    preferencia_comunicacao: '',
    cpf: '',
    identidade: '',
    orgao_expeditor: '',
    cnh: '',
    orgao_expeditor_cnh: '',
    data_nascimento: '',
    estado_civil: 'Solteiro(a)',
    nacionalidade: '',
    profissao: '',
    cnpj: '',
    data_fundacao: '',
    data_abertura: '',
    natureza_juridica: '',
    atividade_principal_cnae: '',
    inscricao_estadual: '',
    enderecos: []
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/home/clientes');
  };

  const handleTipoChange = (event) => {
    setTipoPessoa(event.target.value);
    setFormData({ ...formData, nome_fantasia: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: '0.7rem', marginTop: '0.5rem' }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem', fontSize: '1.0rem' }}>
          Cadastro de Cliente
        </Typography>

        {/* Escolha do tipo de pessoa */}
        <FormControl component="fieldset" sx={{ marginBottom: '1rem' }}>
          <FormLabel component="legend" sx={{ fontSize: '1rem' }}>Tipo de Cliente</FormLabel>
          <RadioGroup row value={tipoPessoa} onChange={handleTipoChange}>
            <FormControlLabel value="fisica" control={<Radio />} label={<Typography sx={{ fontSize: '1rem' }}>Pessoa Física</Typography>} />
            <FormControlLabel value="juridica" control={<Radio />} label={<Typography sx={{ fontSize: '1rem' }}>Pessoa Jurídica</Typography>} />
          </RadioGroup>
        </FormControl>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} alignItems="flex-start">
          <Tab label={<Typography sx={{ fontSize: '1rem' }}>Dados Pessoais</Typography>} />
          <Tab label={<Typography sx={{ fontSize: '1rem' }}>Documentação</Typography>} />
          <Tab label={<Typography sx={{ fontSize: '1rem' }}>Endereço</Typography>} />
        </Tabs>

        <Box sx={{ marginTop: '1rem' }}>
          {/* Aba de Dados Pessoais */}
          {activeTab === 0 && (
            <Box component="form">
              <Grid container spacing={2} direction="column" alignItems="flex-start">
                <Grid item sx={{ width: '60%' }}>
                  <TextField fullWidth size="small" label="Nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
                </Grid>

                {tipoPessoa === 'fisica' && (
                  <>
                    <Grid container item spacing={2} sx={{ width: '80%' }}>
                      <Grid item xs={5}>
                        <TextField fullWidth size="small" label="Data de Nascimento" name="data_nascimento" type="date" value={formData.data_nascimento} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required />
                      </Grid>
                      <Grid item xs={5}>
                        <Select fullWidth size="small" name="estado_civil" value={formData.estado_civil} onChange={handleInputChange}>
                          <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
                          <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                          <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                          <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
                        </Select>
                      </Grid>
                      <Grid container item spacing={2} sx={{ width: '80%' }}>
                        <Grid item xs={5}>
                          <TextField fullWidth size="small" label="Nacionalidade" name="nacionalidade" value={formData.nacionalidade} onChange={handleInputChange} required />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField fullWidth size="small" label="Profissão" name="profissao" value={formData.profissao} onChange={handleInputChange} />
                        </Grid>
                      </Grid>

                      <Grid item sx={{ width: '50%' }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="sexo-label">Sexo</InputLabel>
                          <Select
                            labelId="sexo-label"
                            name="sexo"
                            value={formData.sexo}
                            onChange={handleInputChange}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>Selecione o sexo do cliente</MenuItem>
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Outro">Outro</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </>
                )}

                {tipoPessoa === 'juridica' && (
                  <>
                    <Grid item sx={{ width: '60%' }}>
                      <TextField fullWidth size="small" label="Nome Fantasia" name="nome_fantasia" value={formData.nome_fantasia} onChange={handleInputChange} />
                    </Grid>
                    <Grid container item spacing={2} sx={{ width: '80%' }}>
                      <Grid item xs={5}>
                        <TextField fullWidth size="small" label="Data de Fundação" name="data_fundacao" type="date" value={formData.data_fundacao} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField fullWidth size="small" label="Data de Abertura" name="data_abertura" type="date" value={formData.data_abertura} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                      </Grid>
                    </Grid>
                    <Grid container item spacing={2} sx={{ width: '80%' }}>
                      <Grid item xs={6.0}>
                        <TextField fullWidth size="small" label="Natureza Jurídica" name="natureza_juridica" value={formData.natureza_juridica} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={6.0}>
                        <TextField fullWidth size="small" label="Atividade Principal (CNAE)" name="atividade_principal_cnae" value={formData.atividade_principal_cnae} onChange={handleInputChange} />
                      </Grid>
                    </Grid>

                  </>
                )}
                <Grid item sx={{ width: '50%' }} alignItems="flex-end">
                  <TextField fullWidth size="small" label="Email" name="email" value={formData.email} onChange={handleInputChange} required />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Aba de Documentação */}
          {activeTab === 1 && (
            <Box>
              <Grid container spacing={2} direction="column" alignItems="flex-start">
                {tipoPessoa === 'fisica' ? (
                  <>
                    <Grid item sx={{ width: '40%' }}>
                      <TextField fullWidth size="small" label="CPF" name="cpf" value={formData.cpf} onChange={handleInputChange} required />
                    </Grid>
                    <Grid container item spacing={2} sx={{ width: '80%' }}>
                      <Grid item xs={5.5}>
                        <TextField fullWidth size="small" label="Identidade" name="identidade" value={formData.identidade} onChange={handleInputChange} required />
                      </Grid>
                      <Grid item xs={4.5}>
                        <TextField fullWidth size="small" label="Órgão Expeditor" name="orgao_expeditor" value={formData.orgao_expeditor} onChange={handleInputChange} required />
                      </Grid>
                    </Grid>
                    <Grid container item spacing={2} sx={{ width: '80%' }}>
                      <Grid item sx={{ width: '30%' }}>
                        <TextField fullWidth size="small" label="CNH" name="cnh" value={formData.cnh} onChange={handleInputChange} />
                      </Grid>
                      <Grid item sx={{ width: '30%' }}>
                        <TextField fullWidth size="small" label="Órgão Expeditor CNH" name="orgao_cnh" value={formData.orgao_expeditor_cnh} onChange={handleInputChange} />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item sx={{ width: '40%' }}>
                      <TextField fullWidth size="small" label="CNPJ" name="cnpj" value={formData.cnpj} onChange={handleInputChange} required />
                    </Grid>
                    <Grid container item spacing={2} sx={{ width: '80%' }}>
                      <Grid item xs={5.5}>
                        <TextField fullWidth size="small" label="Inscrição Estadual" name="inscricao_estadual" value={formData.inscricao_estadual} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={4.5}>
                        <TextField fullWidth size="small" label="Natureza Jurídica" name="natureza_juridica" value={formData.natureza_juridica} onChange={handleInputChange} />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          )}

          {/* Aba de Endereço */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>Endereços</Typography>
              <Button variant="contained" size="small" onClick={() => alert('Adicionar endereço')}>Adicionar Endereço</Button>
            </Box>
          )}
        </Box>

        <Box sx={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" type="submit" size="small">Salvar</Button>
          <Button variant="outlined" color="error" onClick={handleCancel} size="small">Cancelar</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ClientesForm;

















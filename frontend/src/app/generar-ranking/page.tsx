"use client";

import { Button, DatePicker, Form, Select, Space } from 'antd';
import type { FormProps } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';

type FieldType = {
  fechaDesde?: string;
  fechaHasta?: string;
  reseña?: string;
  tipoVisualizacion?: string;
};


export default function GenerarRankingVinos() {

  const [tipoVisualizacion, setVisualizacion] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(true)
  
  const generarRankingVinos: FormProps<FieldType>['onFinish'] = async (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      'fechaDesde': fieldsValue['fechaDesde'].format('YYYY-MM-DD'),
      'fechaHasta': fieldsValue['fechaHasta'].format('YYYY-MM-DD'),
    }
    console.log(values)
    await axios.post('http://localhost:4000/generar-ranking', values)
      .then(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        })
        console.log(response.data)
        setVisible(false)
      })
      .catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
      })
        console.log(error)
      })
  };

  return (
    <main className='flex flex-col justify-between min-h-screen'>
      <Header/>
      <div className='flex min-h-full h- flex-col items-center justify-center p-24'>
        <div className='bg-slate-50 p-16 rounded-lg shadow-xl'>
          <h1 className='pb-2 text-xl font-bold'>Generar reporte de ranking de vinos</h1>
          <Form 
            layout='vertical'
            onFinish={generarRankingVinos}
          >
            <Space direction="vertical" align="center" size={'small'} style={{display: 'flex'}}>
              <div>
                <Space size={'middle'} style={{display: 'flex'}}>
                    <Form.Item<FieldType>
                      label="Fecha desde"
                      name="fechaDesde"
                      rules={[
                        {
                          required: true,
                          message: 'Ingrese la fecha',
                        },
                      ]}
                    >
                      <DatePicker 
                        id='desde'
                        format={{ format: 'DD-MM-YYYY', type: 'mask' }} 
                        placeholder='Seleccionar fecha desde' 
                        className='w-72' 
                      />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Fecha hasta"
                        name="fechaHasta"
                        rules={[
                          {
                            required: true,
                            message: 'Ingrese la fecha',
                          },
                        ]}
                      >
                    <DatePicker 
                      id='hasta'
                      format={{ format: 'DD-MM-YYYY', type: 'mask' }} 
                      placeholder='Seleccionar fecha hasta' 
                      className='w-72' 
                    />
                  </Form.Item>
                </Space>
              </div>
              {/* <DatePicker.RangePicker />   */}
              <div>
                <Space size={'middle'} style={{display: 'flex'}}>
                  <Form.Item<FieldType>
                    className='w-52'
                    label="Tipo de reseña"
                    name="reseña"
                    rules={[
                      {
                        required: true,
                        message: 'Seleccione una opción',
                      },
                    ]}
                  >
                    <Select 
                      id='reseña'
                      options={[
                        {value: 'normales', label: <span>Reseñas normales</span>},
                        {value: 'sommelier', label: <span>Reseñas de Sommelier</span>},
                        {value: 'amigos', label: <span>Reseñas de Amigos</span>}
                        ]}
                    />
                  </Form.Item>
                  <Form.Item<FieldType>
                    className='w-52'
                    label="Forma de visualización"
                    name="tipoVisualizacion"
                    rules={[
                      {
                        required: true,
                        message: 'Seleccione una opción',
                      },
                    ]}
                  >
                    <Select 
                      id='visualizacion'
                      options={[
                        {value: 'pdf', label: <span>PDF</span>},
                        {value: 'xlsx', label: <span>Excel</span>},
                        {value: 'pantalla', label: <span>Pantalla</span>},
                        ]}
                      onChange={(e) => setVisualizacion(e)}
                    />
                  </Form.Item>
                </Space>
              </div>
              <div>
                <Space size={'middle'} style={{display: 'flex'}}>
                  <Form.Item>
                    <Button className='w-36' type='primary' htmlType="submit">Confirmar</Button> 
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      className='w-36'
                      type='default' 
                      href={`http://localhost:4000/static/vinos.${tipoVisualizacion}`} 
                      target='_blank' 
                      disabled={visible} >
                        Descargar reporte
                    </Button>
                  </Form.Item>
                </Space>
              </div>
            </Space>
          </Form>
        </div>
      </div>
      <Footer/>
    </main>
  )
}

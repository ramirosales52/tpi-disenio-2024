'use client'

import { Button, DatePicker, Form, Select, Space } from 'antd'
import type { FormProps } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Interfaz de los datos necesarios
type FieldType = {
  fechaDesde: string
  fechaHasta: string
  resenia: string
  tipoVisualizacion: string
}

export default function GenerarRankingVinos() {
  // DEclaramos las variables necesarias
  const [tipoVisualizacion, setVisualizacion] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(true)

  // Enviamos un POST al backend con los datos necesarios
  const generarRankingVinos: FormProps<FieldType>['onFinish'] = async (
    fieldsValue: any
  ) => {
    // Formateamos los datos
    const values = {
      ...fieldsValue,
      fechaDesde: fieldsValue['fechaDesde'].format('YYYY-MM-DD'),
      fechaHasta: fieldsValue['fechaHasta'].format('YYYY-MM-DD'),
    } as FieldType

    const { resenia, tipoVisualizacion, fechaDesde, fechaHasta } = values

    const generarRankingEndpoint = `http://localhost:4000/generar-ranking?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&tipoVisualizacion=${tipoVisualizacion}&tipoResenia=${resenia}`

    await axios
      .get(generarRankingEndpoint)
      // Si la respuesta es exitosa (cod. 200) lanzamos un mensaje exitoso por pantalla
      .then(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
        })
        console.log(response.data)
        setVisible(false)
      })
      // Si hubo un error en la respuesta (cod. 400) lanzamos un mensaje de error por pantalla
      .catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
        })
        console.log(error)
      })
  }

  return (
    <main className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="flex min-h-full h- flex-col items-center justify-center p-24">
        <div className="bg-slate-50 p-16 rounded-lg shadow-xl">
          <h1 className="pb-2 text-xl font-bold">
            Generar reporte de ranking de vinos
          </h1>
          <Form layout="vertical" onFinish={generarRankingVinos}>
            <Space
              direction="vertical"
              align="center"
              size={'small'}
              style={{ display: 'flex' }}>
              <div>
                <Space size={'middle'} style={{ display: 'flex' }}>
                  <Form.Item<FieldType>
                    label="Fecha desde"
                    name="fechaDesde"
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese la fecha',
                      },
                    ]}>
                    <DatePicker
                      id="desde"
                      format={{ format: 'DD-MM-YYYY', type: 'mask' }}
                      placeholder="Seleccionar fecha desde"
                      className="w-72"
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
                    ]}>
                    <DatePicker
                      id="hasta"
                      format={{ format: 'DD-MM-YYYY', type: 'mask' }}
                      placeholder="Seleccionar fecha hasta"
                      className="w-72"
                    />
                  </Form.Item>
                </Space>
              </div>
              {/* <DatePicker.RangePicker />   */}
              <div>
                <Space size={'middle'} style={{ display: 'flex' }}>
                  <Form.Item<FieldType>
                    className="w-52"
                    label="Tipo de reseña"
                    name="resenia"
                    rules={[
                      {
                        required: true,
                        message: 'Seleccione una opción',
                      },
                    ]}>
                    <Select
                      id="reseña"
                      options={[
                        {
                          value: 'normales',
                          label: <span>Reseñas normales</span>,
                        },
                        {
                          value: 'sommelier',
                          label: <span>Reseñas de Sommelier</span>,
                        },
                        {
                          value: 'amigos',
                          label: <span>Reseñas de Amigos</span>,
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item<FieldType>
                    className="w-52"
                    label="Forma de visualización"
                    name="tipoVisualizacion"
                    rules={[
                      {
                        required: true,
                        message: 'Seleccione una opción',
                      },
                    ]}>
                    <Select
                      id="visualizacion"
                      options={[
                        { value: 'pdf', label: <span>PDF</span> },
                        { value: 'xlsx', label: <span>Excel</span> },
                        { value: 'pantalla', label: <span>Pantalla</span> },
                      ]}
                      onChange={e => setVisualizacion(e)}
                    />
                  </Form.Item>
                </Space>
              </div>
              <div>
                <Space size={'middle'} style={{ display: 'flex' }}>
                  <Form.Item>
                    <Button className="w-36" type="primary" htmlType="submit">
                      Confirmar
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="w-36"
                      type="default"
                      href={`http://localhost:4000/vinos.${tipoVisualizacion}`}
                      target="_blank"
                      disabled={visible}>
                      Descargar reporte
                    </Button>
                  </Form.Item>
                </Space>
              </div>
            </Space>
          </Form>
        </div>
      </div>
      <Footer />
    </main>
  )
}

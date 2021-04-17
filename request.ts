import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useStoreon } from 'storeon/react'

import { BackBtn, Button, Scrollable } from '../../../App0/components'

import { TEvents, TState } from '../../../App0/model/store'

import { getToken } from '../../../App0/model/http/utils'
import { Http } from 'features/App0/http/services'

import './styles/index.scss'

type TUserData = {
  merchantId?: string
  sign?: string
  customer_phone?: string
  customer_email?: string
}

export const Card: React.FC = () => {
  const { dispatch } = useStoreon<TState, TEvents>()
  const [userData, setUserData] = useState<TUserData>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://secure.localhost/api/hosted.js'
    document.body.appendChild(script)
    script.onload = () => {
      
      paymentService.hosted.setup('#form-hosted-pay', {
        onsuccess: (data: any) => {
          const token = getToken()
          const formData = new FormData()
          formData.append('bind_id', data.binding.id)
          formData.append('access_token', token)
          Http.post(
            'https://api.localhost/api/engine/view/payment/result.php',
            formData
          )
            .then((res) => {
              setLoading(false)
              if (res.data === 'OK') {
                alert('Done')
                dispatch('profile/card/back-click')
              } else {
                alert('Error')
              }
            })
            .catch(() => {
              setLoading(false)
              alert('Error')
            })
        },
        onerror: () => {
          alert('Error')
          setLoading(false)
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Http.get('https://api.localhost/api/v1/user/').then((res) => {
      setUserData(res.data)
    })
  }, [])
}


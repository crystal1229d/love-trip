import { parse } from 'qs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '@hooks/auth/useUser'
import useReservation from '@components/reservation/hooks/useReservation'
import { makeReservation } from '@/remote/reservation'

import Summary from '@components/reservation/Summary'
import Spacing from '@shared/Spacing'
import Form from '@/components/reservation/Form'
import addDelimiter from '@/utils/addDelimiter'

function ReservationPage() {
  const navigate = useNavigate()
  const user = useUser()

  // 값 보장받기 : 이 값 중 하나라도 없는 경우 => 뒤로가기
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }

  useEffect(() => {
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [startDate, endDate, nights, roomId, hotelId, user])

  const { data, isLoading } = useReservation({
    hotelId,
    roomId,
  })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    }

    await makeReservation(newReservation)

    navigate(`/reservation/done?hotelName=${hotel.name}`)
  }

  const buttonLabel = `${nights}박 ${addDelimiter(
    room.price * Number(nights),
  )}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        onSubmit={handleSubmit}
        forms={hotel.forms}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage

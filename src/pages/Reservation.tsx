import { parse } from 'qs'
import { useEffect } from 'react'

import useUser from '@hooks/auth/useUser'
import useReservation from '@components/reservation/hooks/useReservation'

import Summary from '@components/reservation/Summary'
import Spacing from '@shared/Spacing'

function ReservationPage() {
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
    </div>
  )
}

export default ReservationPage

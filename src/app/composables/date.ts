import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function useDate() {
	function getTime(epoch: number) {
		const date = dayjs(epoch * 1000)
		return dayjs.utc(date).format("h:mm A")
	}

	return { getTime }
}
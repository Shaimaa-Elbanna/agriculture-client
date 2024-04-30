interface Controll {
  scenario: number
  watering: Watering[]
  interval: number

  repetition: number | 1;
  status?: number 
}

interface Watering {
  startTime: number 
  duration: number
}

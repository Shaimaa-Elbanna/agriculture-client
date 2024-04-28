

interface Controll {
  scenario: string;
  watering: Watering[];

  interval: string;

  repetition: number|1;
  status: string;
}

interface Watering {
  startTime: string;
  duration: string;
}

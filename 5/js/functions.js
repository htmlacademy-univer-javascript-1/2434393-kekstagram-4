const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const IndexTime = {
  hours: 0,
  minutes: 1
};

const isCreaterThanLength = (string, length) => (string.length <= length);
// Строка короче 5 символов
isCreaterThanLength('abc',5); //true
// Стркоа равна 5 символам
isCreaterThanLength('abcde'); //true
// Сттрока длиннее 5 символов
isCreaterThanLength('abcdef',5); //false

const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let backwardWord = '';
  for(let i = string.length-1; i >= 0; i--) {
    backwardWord += string[i];
  }
  return backwardWord === string;
};
// Строка является палиндромом
isPalindrome('топот'); //true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('довОд'); //true
// Не палиндром
isPalindrome('Саша'); //true
// Палиндром
isPalindrome('Леша на полке клопа нашел'); //true

const getSeconds = (time) => {
  if (typeof(time) === 'string'){
    time = time.split(':');
    return time[IndexTime.hours] * SECONDS_IN_HOUR + time[IndexTime.minutes] * SECONDS_IN_MINUTE;
  }

  return time * SECONDS_IN_MINUTE;
};

const isPossibleMeeting = (timeStartWorkingDay, timeEndWorkingDay, timeAppointment, appointmentDuration) => {
  timeStartWorkingDay = getSeconds(timeStartWorkingDay);
  timeEndWorkingDay = getSeconds(timeEndWorkingDay);
  timeAppointment = getSeconds(timeAppointment);
  appointmentDuration = getSeconds(appointmentDuration);

  return (timeStartWorkingDay <= timeAppointment && timeAppointment <= timeEndWorkingDay &&
    (timeAppointment + appointmentDuration) <= timeEndWorkingDay);
};

isPossibleMeeting('08:00', '17:30', '14:00', 90); //true
isPossibleMeeting('08:00', '14:30', '14:00', 90); //false

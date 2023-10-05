const isCreaterThanLength = (string, length) => (string.length<=length);
// Строка короче 5 символов
isCreaterThanLength('abc',5); //true
// Стркоа равна 5 символам
isCreaterThanLength('abcde'); //true
// Сттрока длиннее 5 символов
isCreaterThanLength('abcdef',5); //false

function isPalindrome(string){
  string=string.replaceAll(' ', '').toLowerCase();
  let backwardWord='';
  for(let i=string.length-1; i>=0; i--)
  {
    backwardWord+=string[i];
  }

  return (backwardWord===string);
}
// Строка является палиндромом
isPalindrome('топот'); //true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('довОд'); //true
// Не палиндром
isPalindrome('Саша'); //true
// Палиндром
isPalindrome('Леша на полке клопа нашел'); //true


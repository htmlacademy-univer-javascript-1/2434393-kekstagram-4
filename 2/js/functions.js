function isCreaterThanLength(string, length){
  if (string.length<=length){
    return true;
  } else {
    return false;
  }
}
isCreaterThanLength();

function isPalindrome(string){
  string=string.replaceAll(' ', '');
  string=string.toLowerCase();
  let newWord=''; //2

  for(let i=string.length-1; i>=0; i--)
  {
    newWord+=string[i];
  }

  if(string===newWord){
    return true;
  }
  else {
    return false;
  }
}
isPalindrome();

function bowdlerize(input, dictionary)
{
  if(typeof input !== 'string'){
    throw new Error(`Input should be a string`)    
  }
  if(dictionary.some(elem => typeof elem !== 'string')){
    throw new Error(`Invalid dictionary format`)
  }
  if(dictionary.length > 0){
    let newInput = input
    let words = newInput.split(" ")

    for(let i=0; i<words.length; i++){
      if(dictionary.findIndex(elem => elem.toLowerCase() === words[i].toLowerCase() && elem.length > 2)!==-1){
        newInput = newInput.replace(words[i], words[i].charAt(0) + "*".repeat(words[i].length-2) +
                                    words[i].charAt(words[i].length-1))
      }
    }
    return newInput
  }
}


const app = {
    bowdlerize
};

module.exports = app;
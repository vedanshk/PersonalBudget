 const doesTitleExists = (title , envelopes) =>{

   return envelopes.findIndex( envelope =>  envelope.title == title);

}

module.exports =  {
    doesTitleExists
}

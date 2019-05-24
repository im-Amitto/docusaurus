window.addEventListener('load', function() {
  function highlight(codeBlockSelector) {
    document.querySelectorAll(codeBlockSelector).forEach(function(code) {
      var classnames = code.className;
      if(classnames.toString().indexOf("{") != -1)
      {
        classnames.split(" ").forEach(o=>{
          if(o[0] == "{")
            {
              o = o.split('{').join('');
              o = o.split('}').join('');
              var x = o.split(",");
              x.forEach(o=>{
                var start;
                var end;
                var line_length = 24;          
                var temp = document.createElement('div');
                temp.setAttribute('aria-hidden','true');
                if(o.length == 1)
                {
                  start = parseInt(o, 10);
                  end = start + 1;
                }
                else
                {
                  var range = o.split("-");
                  start = parseInt(range[0], 10);
                  end = parseInt(range[1], 10) + 1; 
                }
                temp.style.top = ((start-1)*24).toString()+"px";
                temp.style.height = (end-start)*line_length.toString()+"px";
                temp.classList.add("line-highlight");
                code.parentNode.appendChild(temp);
              })
            }
        })
      }  
    });
  }
  function getNumber(expression){ 
    return expression.toString().match(/[0-9]+/);
  }
  function indexing(){
    let index=1;
    let temp;
    while(temp = document.body.innerHTML.match(/{{chapter-number},[0-9]+}/))
    {
      let subTopicCount = getNumber(temp);
      let subIndex = 1;
      document.body.innerHTML = document.body.innerHTML.replace(/{{chapter-number},[0-9]*}/, index);
      
      while(subTopicCount > 0)
      {
        document.body.innerHTML = document.body.innerHTML.replace('{{subtopic}}', index+"."+subIndex);
        subIndex++;
        subTopicCount --;
      }
      index++;
    }
  }
  indexing();
  highlight(
    '.hljs'
  );
});


window.addEventListener('load', function() {  
    function highlight(codeBlockSelector) {
      document.querySelectorAll(codeBlockSelector).forEach(function(code) {
        var x = code.className.split("{")[1].split("}")[0].split(","); // lines which needs to be highligted
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
      });
    }
 
    highlight('.hljs');
  });

  
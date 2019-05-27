window.addEventListener('load', function() {

//Add copy to clipboard button
  function button(label, ariaLabel, icon, className, action) {
    const btn = document.createElement('button');
    btn.classList.add('btnIcon', className);
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', ariaLabel);
    if(action){
      btn.setAttribute('onclick', action);
    }
    btn.innerHTML =
      '<div class="btnIcon__body">' +
      (icon? icon : '') +
      '<strong class="btnIcon__label">' +
      label +
      '</strong>' +
      '</div>';
    return btn;
  }

  function addCopyButton(codeBlockSelector, btn) {
    document.querySelectorAll(codeBlockSelector).forEach(function(code) {
      code.parentNode.appendChild(btn.cloneNode(true));
    });
  }

  const copyIcon =
    '<svg width="12" height="12" viewBox="340 364 14 15" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M342 375.974h4v.998h-4v-.998zm5-5.987h-5v.998h5v-.998zm2 2.994v-1.995l-3 2.993 3 2.994v-1.996h5v-1.995h-5zm-4.5-.997H342v.998h2.5v-.997zm-2.5 2.993h2.5v-.998H342v.998zm9 .998h1v1.996c-.016.28-.11.514-.297.702-.187.187-.422.28-.703.296h-10c-.547 0-1-.452-1-.998v-10.976c0-.546.453-.998 1-.998h3c0-1.107.89-1.996 2-1.996 1.11 0 2 .89 2 1.996h3c.547 0 1 .452 1 .998v4.99h-1v-2.995h-10v8.98h10v-1.996zm-9-7.983h8c0-.544-.453-.996-1-.996h-1c-.547 0-1-.453-1-.998 0-.546-.453-.998-1-.998-.547 0-1 .452-1 .998 0 .545-.453.998-1 .998h-1c-.547 0-1 .452-1 .997z" fill-rule="evenodd"/></svg>';


  const clipboard = new ClipboardJS('.btnClipboard', {
    target: function(trigger) {
      return trigger.parentNode.querySelector('code');
    },
  });

  clipboard.on('success', function(event) {
    event.clearSelection();
    const textEl = event.trigger.querySelector('.btnIcon__label');
    textEl.textContent = 'Copied';
    setTimeout(function() {
      textEl.textContent = 'Copy';
    }, 2000);
  });

// Add Close Button
  function addCloseButton(codeBlockSelector, btn) {
    document.querySelectorAll(codeBlockSelector).forEach(function(code) {
      code.insertBefore(btn.cloneNode(true),code.childNodes[0]);
    });
  }

//Highlight in Code Block
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
//Extract Number from string
  function getNumber(expression){ 
    return expression.toString().match(/[0-9]+/);
  }
//Generate ToC
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
// Function Calls
  indexing();
  highlight(
    '.hljs'
  );
  
  addCloseButton(
    '.onPageNav',
    button('X', 'Close Right Panel',  null, 'close-right-btn', "hide('.close-right-btn')"),
  );

  addCopyButton(
    '.hljs',
    button('Copy', 'Copy code to clipboard', copyIcon, 'btnClipboard',null),
  );

});

//Hide Right Sidebar
function hide(codeBlockSelector) {
  document.querySelectorAll(codeBlockSelector).forEach(function(code) {
    code.parentNode.childNodes.forEach(o=>{
      o.style.display = 'none';
    })    
  });
}

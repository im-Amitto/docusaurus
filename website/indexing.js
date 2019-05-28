var fs = require("fs")
var path = require('path');

var root = "./../book/"
var target = "./../docs/"

var docs = require(root+'ToC.json')

var sidebar = {
  "docs": {
    "book": ["index"
    ]
  }
};

var introduction = fs.readFileSync(root+'Introduction.md', 'utf8');

var head =  `## Table of Contents\n\n`;
var body="";
//Contain script
var footer=`
<script>
window.addEventListener('load', function() {
show('.toc-headings');
show('.close-right-btn');
})
</script>
`;

let index = 1;

if (!fs.existsSync(target)){
  fs.mkdirSync(target);
}

fs.readdir(target, (err, files) => {
  if (err) console.log(err);
  else
  {
    for (const file of files) {
      fs.unlink(path.join(target, file), err => {
        if (err) console.log(err);
      });
    }
    docs.forEach(element => {
      sidebar['docs']['book'].push(element.name);
      body +=
      `### [Chapter `+index+" - "+element.title+`](./`+element.name+`)\n`;
      
      var contents = fs.readFileSync(root+element.name, 'utf8');
      
      contents = `---`+
      `\nid: `+element.name+
      `\ntitle: Chapter `+index+
      `\n---\n\n`+`# `+element.title+`\n`+ contents + footer;

      var subtopics = contents.match(/[^#]## [0-9/.A-Za-z ,-]*/g);
      var subsubtopics = contents.match(/[^#]### [0-9/.A-Za-z ,-]*/g); 
      let subIndex =1;

      subtopics.forEach(oldTopic=>{
        start = contents.match(subtopics[subIndex-1]).index;
        end = contents.match(subtopics[subIndex]).index;
        newTopic = oldTopic.replace('##','## '+index+'.'+subIndex);
        contents = contents.replace(oldTopic,newTopic);
        newTopic = newTopic.replace(/\n##/g,'');
        topicName = newTopic.replace(/ [0-9]+\.[0-9]+/g,'');
        body += `- [**`+index+"."+subIndex+"** "+topicName+`](./`+element.name+`#`+text2url(newTopic)+`)\n`;
        let subsubindex = 1;
        if(subsubtopics)
        {
          if(end)
          {
            subsubtopics.forEach(obj=>{
              if(!contents.match(obj)) return true;
              loc = contents.match(obj).index;
              if(loc > start && loc < end){
                newObj = obj.replace('###','### '+index+'.'+subIndex+'.'+subsubindex);
                contents = contents.replace(obj,newObj);
                subsubindex++;
              }
            })
          }
          else
          {
            subsubtopics.forEach(obj=>{
              newObj = obj.replace('###','### '+index+'.'+subIndex+'.'+subsubindex);
              contents = contents.replace(obj,newObj);
              subsubindex++;
            })
          }
        }
  
        subIndex++;
      })

      fs.writeFile(target+element.name, contents, (err) => {
        if (err) console.log(err);
      });
      
      index++;
  });
  
  introduction = introduction.replace('{{table-of-content}}',head+body);
  
  fs.writeFile(target+"Introduction.md", introduction, (err) => {
    if (err) console.log(err);
  });

  fs.writeFile(__dirname+'/sidebars.json', JSON.stringify(sidebar, null, "\t"), (err) => {
    if (err) console.log(err);
  });

  }
});


function text2url(data){
  data = data.trim();
  data = data.split('.').join('').toLowerCase().split(' ').join('-');
  while(data.indexOf('--') !== -1)
    data = data.split('--').join('-');
return data;
}

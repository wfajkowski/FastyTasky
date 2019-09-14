  let inputText = document.getElementById("txt"),
                 items = document.querySelectorAll("#list li"),
                 tab = [];
         
             // get the selected li index using array
             // populate array with li values
             
             for(let i = 0; i < items.length; i++){
                 tab.push(items[i].textContent);
             }
             
             // get li index onclick
            //  for(let i = 0; i < items.length; i++){
                 
            //      items[i].onclick = function(){
            //          console.log(this.textContent);
            //          console.log(tab.indexOf(`${this.textContent}`));
            //          // set the selected li value into input text
                     
            //      };
                 
            //  }

            function refreshArray()
            {
                // clear array
                tab.length = 0;
                items = document.querySelectorAll("#list li");
                // fill array
                for(var i = 0; i < items.length; i++){
                 tab.push(items[i].textContent);
               }

            //    wazne console
            //    console.log(tab);
            //    console.log(tab.indexOf(inputText.value))
            }
            function addListItem(){
                const listNode = document.getElementById("list"),
                    textNode = document.createTextNode(inputText.value),
                    liNode = document.createElement("li");
                    
                    liNode.appendChild(textNode);
                    listNode.appendChild(liNode);
                    
                    refreshArray();
                    // add event to the new LI
                    
                    liNode.onmouseover = function(){
                    liNode.innerHTML = `<p>${this.textContent}</p><button class="btn"><i class="fa fa-trash"></i></button>`;
                    index = tab.values(liNode.innerHTML);
                     };
                    //  liNode.onclick = function(){
                    //     console.log(tab.indexOf(`${this.textContent}`));
                    // }
             }

             function removeItem(){
                        
                        items = document.querySelectorAll("#list li");
                        console.log(tab.indexOf());
                     }
                   
             const button = document.getElementById('add_button');
             button.addEventListener('click', addListItem);
      const deleteb = document.getElementById('delete');
         deleteb.addEventListener('click', removeItem)
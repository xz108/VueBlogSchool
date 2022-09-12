import {ElMessage} from "element-plus"
import ElementPlus from 'element-plus'
export default {

    mounted(el){
        console.log('el::'+el.textContent)
        let html=el.textContent;
        const rules=[
            [/#{6}\s?([^\n]+)\n/g,'<h6>$1</h6>'],
            [/#{5}\s?([^\n]+)\n/g,'<h5>$1</h5>'],
            [/#{4}\s?([^\n]+)\n/g,'<h4>$1</h4>'],
            [/#{3}\s?([^\n]+)\n/g,'<h3>$1</h3>'],
            [/#{2}\s?([^\n]+)\n/g,'<h2>$1</h2>'],
            [/#{1}\s?([^\n]+)\n/g,'<h1>$1</h1>'],
            [/\*\*([^*]+)\*\*/g,'<b>$1</b>'],
            [/\*([^*]+)\*/g,'<i>$1</i>'],
            // [/^[`]{3}/g,'<code>'],
            // [/[^`{3}\w+]([\s\S]*|[\w\W]*|[\d\D]*)[^```]/g,'<p>$1</p>'],
            // [/([^`{3}\w*]\w+)/g,'<p>$1</p>'],
            // [/[`]{3}$/g, '</code>'],
            [/```\n([\s\S]*?)```[\s]?/g,'<textarea style="color: #f2f2f2;   resize: none;\n' +
            '    width: 460px;\n' +
            '    background: #181818;\n' +
            '    border: 2px dashed orange;">$1</textarea>'],
            [/!\[([^\]]+)\]\(([^\)]+)\)/gm,'<div style="text-align: center" > <img  width="400px" height="300px" src="$2" alt="$1"/></div>'],
            // [/!\[[^\]]+\]\([^\)]+\)/g,'<img src="$2" alt="$2" title="$2"/><p>$1</p>'],
            // [/```([\s\S]*?)```[\s]?/g,'<aa>$1</aa>'],
            [/\~\~(.*?)\~\~/g,'<del>$1</del>'],
            [/\s\s\n/g,'</br>'],
            [/`{1,2}[^`](.*?)`{1,2}/g,'<textarea style="color: #f2f2f2">$1</textarea>'],
            [/^-+$/gm,'<p style="text-align: center">----------------------------------------------------------------------------<p>'],
            [/^[\s]*[0-9]+\.(.*)/gm,'<li>$1</li>'],
            [/^[\s]*[-\*\+] +(.*)/gm,'<li>$1</li>'],
            [/(?<!!)\[(.*?)\]\((.*?)\)/g,'<a href="$2"> $1</a>'],
        ];
        rules.forEach(([rules,template])=>
            html= html.replace(rules,template))
        console.log(html);
        // ElMessage({message:"hhhhh",type:'error'});
        el.innerHTML=html;
    }
}
export function MarkDownChange(content){
    // content="## head\n"
    const rules=[
        [/#{6}\s?([^\n]+)\n/g,'<h6>$1</h6>'],
        [/#{5}\s?([^\n]+)\n/g,'<h5>$1</h5>'],
        [/#{4}\s?([^\n]+)\n/g,'<h4>$1</h4>'],
        [/#{3}\s?([^\n]+)\n/g,'<h3>$1</h3>'],
        [/#{2}\s?([^\n]+)\n/g,'<h2>$1</h2>'],
        [/#{1}\s?([^\n]+)\n/g,'<h1>$1</h1>'],
        [/\*\*([^*]+)\*\*/g,'<b>$1</b>'],
        [/\*([^*]+)\*/g,'<i>$1</i>'],
        [/```\n([\s\S]*?)```[\s]?/g,'<textarea style="color: #f2f2f2;   resize: none;\n' +
        '    width: 100%;\n' +
        '    background: #181818;\n' +
        '    border: 2px dashed orange;height: 400px overflow-y:visible">$1</textarea>'],
        [/!\[([^\]]+)\]\(([^\)]+)\)/gm,'<div style="text-align: center" > <img  width="400px" height="300px" src="$2" alt="$1"/></div>'],
        [/\~\~(.*?)\~\~/g,'<del>$1</del>'],
        [/\s\s\n/g,'</br>'],
        [/`{1,2}[^`](.*?)`{1,2}/g,'<textarea style="color: #f2f2f2;   resize: none;\n' +
        '    width: 100%;\n' +
        '    background: #181818;\n' +
        '    border: 2px dashed orange;height: 400px overflow-y:visible">$1</textarea>'],
        [/^-+$/gm,'<p style="text-align: center">----------------------------------------------------------------------------<p>'],
        [/^[\s]*[0-9]+\.(.*)/gm,'<li>$1</li>'],
        [/^[\s]*[-\*\+] +(.*)/gm,'<li>$1</li>'],
        [/(?<!!)\[(.*?)\]\((.*?)\)/g,'<a href="$2"> $1</a>'],
    ];
    rules.forEach(([rules,template])=>
        content= content.replace(rules,template))
    // console.log("hhh"+content)

    return content
}

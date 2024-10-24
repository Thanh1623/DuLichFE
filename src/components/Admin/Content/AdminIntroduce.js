import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const AdminIntroduce = (props) => {

    const handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
    }
    return (
        <>
            <div>
                Giới thiệu
            </div>
            <div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </div>
        </>
    )
}

export default AdminIntroduce;
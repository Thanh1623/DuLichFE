import MarkdownIt from 'markdown-it';
import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { getIntro, putIntro } from '../../../Service/apiServices';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const AdminIntroduce = (props) => {
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [dataIntro, setDataIntro] = useState({});
    const [idIntro, setIdIntro] = useState('')


    const handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        setContentMarkdown(text);
        setContentHTML(html)
    }

    useEffect(() => {
        fetchIntro()
    },[])

    const fetchIntro = async () => {
        let data = await getIntro();
        if (data && data.code === 200) {
            setIdIntro(data.result[0].intro_id)
            setContentMarkdown(data.result[0].ContentMarkDown);
        }
    }
    const updateIntro = async () => {
        let data = await putIntro(idIntro, {
            ContentMarkDown: contentMarkdown,
            ContentHTML: contentHTML
        });
        if (data && data.code===200) {
            toast.success(data.message);
        }
        if (data && data.code !== 200) {
            toast.error(data.message);
        }
    }
    return (
        <>
            <div className='container'>
                <div>
                    Giới thiệu
                </div>
                <div>
                    <MdEditor style={{ height: '500px' }} value={contentMarkdown}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange} />
                </div>
                <div>
                    <button className='btn btn-primary mt-3' onClick={() => updateIntro()}>Update</button>
                </div>
            </div>
        </>
    )
}

export default AdminIntroduce;
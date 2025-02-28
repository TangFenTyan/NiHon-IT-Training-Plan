// 权限判断通用代码
// 一开始的权限设置的问题在于，虽然侧边栏没有显示没有权限的地址，但依然可以直接在地址栏里输入目标网址进行访问，同时控制台警告
// Warning: Encountered two children with the same key, `5`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.

/*
import { Redirect, useLocation } from 'umi'; // useLocation

const Auth = (props) => { // props: any in TS
    const location = useLocation() // useLocation: 拿到当前路径
    // const tokenContent = localStorage.getItem('token')
    // const { role: { rights } } = tokenContent == '' ? { role: { rights: '' } } : JSON.parse(tokenContent) // JSON.parse
    // console.log(rights) // 权限列表
    // rights.checked.push('/') // 加一个斜杠
    if (localStorage.getItem('token')) { // 有token则遵循../index.jsx跳转到home
    // if (tokenContent) {
        // if(rights.checked.includes(location.pathname)) { // checked.includes: 确保目标地址被包含在权限列表中
            return <div>{props.children}</div>;
        // }
        // return <Redirect to="/404" />;
    }
    return <Redirect to="/login" />;
};

export default Auth;
*/

import { Redirect, useLocation } from 'umi'; // useLocation

const Auth = (props) => { // props: any in TS
    const location = useLocation() // useLocation: 拿到当前路径
    const tokenContent = localStorage.getItem('token')
    const { id, state: { rights } } = tokenContent == '' ? { id: '', state: { rights: [] } } : JSON.parse(tokenContent) // JSON.parse
    const { pathname } = location;
    const matchPath = pathname.match(/^(.*?)\/(\d+)$/);
    const matchedPath = matchPath ? matchPath[1] : null
    const matchId = pathname.match(/\/(\d+)$/);
    const matchedId = matchId ? matchId[1] : null
    // console.log(id)
    // console.log(matchedPath, matchedId)
    // console.log(rights) // 权限列表
    rights.push('/') // 加一个斜杠
    const rights2 = rights.map(right => `${right}/${matchedId}`);
    // console.log(rights2, pathname)
    //const res = await axios.get(`http://localhost:5000/goods?_expand=user&userId=${id}`)
    // if (localStorage.getItem('token')) { // 有token则遵循../index.jsx跳转到home
    if (tokenContent) {
        if (rights.includes(pathname) || rights2.includes(pathname)) { // checked.includes: 确保目标地址被包含在权限列表中 // rights.includes(pathname)
            // 继续判断
            return <div>{props.children}</div>;
        }
        return <Redirect to="/404" />;
    }
    return <Redirect to="/login" />;
};

export default Auth;
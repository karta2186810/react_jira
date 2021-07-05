import {SearchPanel} from "./SearchPanel";
import {List} from "./List";
import {useEffect, useState} from "react";
// 在obj和query間相互轉換
import qs from 'qs'
import {cleanObj, useMount} from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListPage = () => {
	const [param, setParam] = useState({
		name: '',
		personId: ''
	})
	const [list, setList] = useState([])
	const [users, setUsers] = useState([])

	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(param))}`).then( async res => {
			if (res.ok) {
				setList(await res.json())
			}
		})
	}, [param])

	useMount(() => {
		fetch(`${apiUrl}/users`).then(async res => {
			if (res.ok) {
				setUsers(await res.json())
			}
		})
	})

	return (
		<div>
			<SearchPanel param={param} setParam={setParam} users={users}/>
			<List list={list} users={users}/>
		</div>
	)
}

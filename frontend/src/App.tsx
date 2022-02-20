import Button from '@mui/material/Button'
import { VFC } from 'react'
import { useFetchUsers } from './hooks/useFetchUsers'

export const App: VFC = () => {
  // カスタムフックの使用
  // 関数を実行し返却値を分割代入で受け取る
  const { userList, isLoading, isError, onClickFetchUser } = useFetchUsers()

  return (
    <div>
      <Button variant="contained" onClick={onClickFetchUser}>ユーザー取得</Button>
      {/* エラーの場合はエラーメッセージを表示 */}
      {isError && <p style={{ color: 'red' }}>エラーが発生しました</p>}
      {/* ローディング中は表示を切り替える */}
      {isLoading ? (
        <p>データ取得中です</p>
      ) : (
        userList.map((user) => (
          <p key={user.user_id}>
            {user.user_id} : {user.user_name} ({user.age}歳)
            <br />{user.hobby}
            <br />{user.job}
          </p>
        ))
      )}
    </div>
  )
}

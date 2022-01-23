import { useState } from 'react'
import axios from 'axios'
import type { UserList } from '../types/UserList'
import type { User } from '../types/User'

// ユーザー一覧を取得するカスタムフック
export const useFetchUsers = () => {
  const [userList, setUserList] = useState<UserList | []>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // ユーザー取得ボタン押下アクション
  const onClickFetchUser = () => {
    // ボタン押下時にローディングフラグ on、エラーフラグ off
    setIsLoading(true)
    setIsError(false)
    // API の実行（コンテナ内に入って curl でアクセスするとデータ取得できるのにエラーになる）
    axios
      .get('/users')
      .then((result) => {
        console.log(result)
        // 苗字と名前を統合するように変換
        const users = result.data.map((user: User) => ({
          user_id: user.user_id,
          user_name: user.user_name,
          age: user.age,
          sex: user.sex,
          hobby: user.hobby,
          job: user.job,
        }))
        // ユーザー一覧 State を更新
        setUserList(users)
      })
      // エラーの場合はエラーフラグを on
      .catch((e) => {
        console.log(e)
        setIsError(true)
      })
      // 処理完了後はローディングフラグを off
      .finally(() => setIsLoading(false))
  }

  // まとめて返却したいのでオブジェクトに設定する
  return { userList, isLoading, isError, onClickFetchUser }
}

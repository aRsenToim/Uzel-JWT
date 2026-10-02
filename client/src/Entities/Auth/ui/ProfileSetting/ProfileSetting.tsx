import { useState, type FC } from 'react'
import s from './ProfileSetting.module.scss'
import { Button, Input } from '../../../../shared/UI'

interface IProps {
    isStartVerified: boolean,
    verifiedUserAction: (code: string) => void,
    sendVerifyUserAction: () => void,
    email: string,
    accountVerified: boolean
}

const ProfileSetting: FC<IProps> = ({ isStartVerified, verifiedUserAction, sendVerifyUserAction, email, accountVerified }) => {
    const [startVerif, setStartVerif] = useState<boolean>(false)
    const [code, setCode] = useState<string>("")

    return <div className={s.ProfileSetting}>
        {accountVerified ?? <>{isStartVerified ? <div className={s.ProfileSetting__verifiedAccount}>
            <h1>Код подтверждения отправлен на {email}</h1>
            <Input onChange={(e) => { setCode(e.currentTarget.value) }} value={code} label='Введите код' />
            <Button title='Отправить' style={{ width: "200px" }} click={() => {
                verifiedUserAction(code)
            }} />
        </div> : <Button title='Подтвердить аккаунт' disabled={startVerif} style={{ width: "200px" }} click={() => {
            sendVerifyUserAction(),
                setStartVerif(true)
        }} />}</>}
    </div>
}

export default ProfileSetting
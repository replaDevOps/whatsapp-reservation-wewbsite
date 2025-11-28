
import { useEffect, useState } from 'react'
import { Avatar, Button, Card, Dropdown, Space } from 'antd'
import { useTranslation } from 'react-i18next';


const UserProfileDropDown = ()=> {
  const {t} = useTranslation()
  const [initials, setInitials] = useState(null)
  const [ loading, setLoaing ] = useState(false)
  
  useEffect(()=>{
    const user= localStorage.getItem("user") || null
    if(user){
      const {firstName, lastName}= JSON.parse(user)
      setInitials(`${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase())
    }
  }, [localStorage])
  const handleLogout = () => {
    setLoaing(true)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("email")
    localStorage.removeItem("user")
    setInterval(() => {
      setLoaing(false)
      window.location.href = "/";
    }, 2000);
  };


  const dropdownContent = (
    <Card className='radius-12 shadow-c card-cs'>
      <Space direction='vertical'> 
        <Button className='btnsave w-100'
          type='primary' 
          loading={loading}
          onClick={handleLogout}
          block
          >
            {t("Logout")}
        </Button>
      </Space>
    </Card>
);
  return (
    <>
    <div>
      <Dropdown
          popupRender={()=>dropdownContent}
          trigger={['click']}
          className='p-0'
          placement='bottom'
          arrow
      >
        <Avatar size={40}className='cursor'>{initials}</Avatar>
      </Dropdown>
    </div>
    </>
  )
}

export {UserProfileDropDown}
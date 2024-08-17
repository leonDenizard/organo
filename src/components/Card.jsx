function Card({ imgProfile, name, surname, role, iconSlack, slack, iconWhats, whats, iconMail, mail, iconHour, hour, iconSuper, supe, iconBirthday, birthday, iconChild, child }) {
  return (
    <div className="border-2 border-border-color min-w-60">
      <div>
        <img src={imgProfile} alt="photo profile" />
      </div>

      <div>
        <h1>{name}</h1>
        <p>({surname})</p>
      </div>

      <div>
        <h2>{role}</h2>
      </div>

      <div>

        <div className="slack">
            <div>{iconSlack}</div>
            <p>{slack}</p>
        </div>
        
        <div>
            <div>{iconWhats}</div>
            <p>{whats}</p>
        </div>
        
        <div>
            <img src={iconMail} alt="" />
            <p>{mail}</p>
        </div>
        
        <div>
            <div>{iconHour}</div>
            <p>{hour}</p>
        </div>
        
        <div>
            <div>{iconSuper}</div>
            <p>{supe}</p>
        </div>
        
        <div>
            <div>{iconBirthday}</div>
            <p>{birthday}</p>
        </div>
        
        <div>
            <div>{iconChild}</div>
            <p>{child}</p>
        </div>
        

      </div>
    </div>
  )
}

export default Card

import { useRef, useState } from 'react'
import './form.scss'

import {updateMatchList} from '../../utils/redux/slices/match_slice'
import { useDispatch } from 'react-redux'


export default function Form() {

    const match_type_ref = useRef()

    const [match_type , setMatch_type] = useState("Friendly")
    const [section , setSection] = useState("Type")
    const [level , setLevel] = useState(1)

    const dispatch = useDispatch()

    const submit = (e) => {
        e.preventDefault()
        e.stopPropagation()  
        if (validate_before_continue()){

            const formData = new FormData(e.target);
       
            const data = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
                    ...memo,
                    [key]: value,
                }), {});
            
            
            dispatch(updateMatchList(data))
        }else{
            alert("Fill all the fields to continue")
        }
        
        
    }

    const updateMatchType = (e) => {
        let type= e.target.value

        setMatch_type(type)
    }

    const updateFormLevel = (e) => {

        let action = e.target.id

        if (action === 'back'){

            switch(section){
                case 'General':
                    setSection('Type')
                    break
                case 'Teams' :    
                    setSection('General')
                    break
                default : return null     
            }
           
            setLevel((level) => level-1)

        }else if (action === 'next'){

            // validate_before_continue()
            
            switch(section){
                case 'Type':
                    
                    if(match_type_ref.current.value === "Match Type"){
                        alert("Select a match type to continue") 
                    
                    }else{
                        setSection('General') 
                        setLevel((level) => level+1)   
                    }
                    
                    break
                case 'General' : 
                    if(validate_before_continue()) {
                        setSection('Teams')
                        setLevel((level) => level+1)
                    }else{
                        alert("Fill all the fields to continue")
                    }   
                    break
                default : return null   
            }

           
        }  
        
    }

    const validate_before_continue = () =>{

        var inputs_valid  , select_valid , textarea_valid  
        
        var inputs = document.querySelectorAll('fieldset.visible input')
        var selections = document.querySelectorAll('fieldset.visible selection')
        var textarea = document.querySelector('fieldset.visible textarea')

            inputs.forEach((field) =>{

                if (field.value === ''){
                    inputs_valid = false             
                }else if(field.value !== '' && inputs_valid !== false){

                    inputs_valid = true
                    
                }
                
            })

            selections.forEach((field) =>{
                if (field.value === ''){
                    
                    select_valid = false             
                }else if(field.value !== '' && select_valid !== false){

                    select_valid = true
                    
                }
            })
            
            if(textarea !== null && textarea.value === ''){
                
                textarea_valid = false
                
            }else if(textarea !== null && textarea !== undefined && textarea !== ''){
                textarea_valid = true
            }

        if (inputs_valid === false || select_valid === false || textarea_valid === false ) {
                return false
        }else {
                return true
            }   
        
    }

    return (
        <div className='form main-container'>

            <div className='form-level'>
                <span id="section">{section}</span>
                <span id="level">{level}</span>
                <span > / 3</span>
            </div>
            <form onSubmit={submit}>
                
                <fieldset className={section==="Type"?"visible":"hidden"} >
                    
                    <select onChange={updateMatchType} name="match_type" defaultValue="Match Type" ref={match_type_ref}>
                        <option value="Match Type" disabled> Match Type</option>
                        <option value="Friendly">Friendly</option>
                        <option value="Tournament">Tournament</option>
                    </select>

                </fieldset>

                {match_type ==="Friendly" &&
                    
                    <fieldset   className={section==="General"?"visible":"hidden"} id="general_a">
                        <div>
                            <label htmlFor='start_datetime'> Start Date &amp; Time</label>
                            <input type="datetime-local" placeholder='Start Date &amp; Time' name='start_datetime' required/>
                        </div>
                        <div>
                            <label htmlFor='end_datetime'> End Date &amp; Time</label>
                            <input type="datetime-local" placeholder='End Date &amp; Time' name='end_datetime' required/>
                        </div>
                        
                        <input type="text" placeholder='Match Location' name='location'/>
                        <textarea rows="30"  name='comments' placeholder="Comments" required/>
                    </fieldset>
                }

                {match_type === "Tournament" &&
                    
                    <fieldset   className={section==="General"?"visible":"hidden"} id="general_b">
                        <div>
                            <label htmlFor='start_datetime'> Start Date &amp; Time</label>
                            <input type="datetime-local" placeholder='Start Date &amp; Time' name='start_datetime' required/>
                        </div>    
                        <div>
                            <label htmlFor='end_datetime'> End Date &amp; Time</label>
                            <input type="datetime-local" placeholder='End Date &amp; Time' name='end_datetime' required/>
                        </div>
                        <input type="text" placeholder='Match Location' name='location' />
                        
                        <input type="text" placeholder='Tournament Name' name='tournament_name' required/>
                        <textarea rows="30" name='comments' placeholder="Comments" required/>
                       

                    </fieldset>
                }

                <fieldset  className={section==="Teams"?"visible":"hidden"} id="teams">
                    <input type="text" name='team_one_name' placeholder="Team 1 Name" required/>
                    <div>&nbsp;</div>
                    <select name='team_one_position' defaultValue="Home or Away">
                        <option value='Home or Away' disabled> Home or Away </option>
                        <option value='home'> Home </option>
                        <option value='away'> Away </option>
                    </select>

                    <hr />
                    <span> VS </span>
                    <hr />

                    <input type="text" name='team_two_name' placeholder="Team 2 Name" required/>
                    <div>&nbsp;</div>
                    <select name='team_two_position' defaultValue="Home or Away">
                        <option value='Home or Away' disabled> Home or Away </option>
                        <option value='home'> Home </option>
                        <option value='away'> Away </option>
                    </select>
                </fieldset>
                
                <div className='pagination-btns'>
                    {section!=="Type" &&
                        <button type="button" id="back" onClick={updateFormLevel}> Back </button>
                    }
                    {section!=="Teams" &&
                        <button type="button"  id="next" onClick={updateFormLevel}> Next </button>
                    }
                    {section==="Teams" &&
                        <button type='submit'> Submit </button>
                    }
                </div>   
            </form>


             
        </div>
    )
}
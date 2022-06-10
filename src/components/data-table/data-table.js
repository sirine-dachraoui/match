import { useSelector } from "react-redux"

import './data-table.scss'
export default function DataTable() {

    const matches = useSelector((state) => state.matches)

    const transform_date = (data) => {

        var hour_short
        var am_or_pm    
        var hour = data.split("T")[1].split(":")[0]
        var min =  data.split("T")[1].split(":")[1]
        var date = data.split("T")[0]
        
        if(hour > 12) {
            hour_short = hour -12 
            am_or_pm = "PM"

            return (date.replaceAll("-","/").slice(2) + " - "+hour_short+":"+min+" "+am_or_pm)
            
        }else {
            am_or_pm = "AM"
            return (date.replaceAll("-","/").slice(2) + " - "+hour+":"+min+" "+am_or_pm)
   
        }   

    }

    return (

        <div className="table main-container">
            { matches.length > 0 &&
                <table cellPadding="2rem">
                    <thead>
                        <tr>
                            <th> Team 1</th>
                            <th> Team 2</th>
                            <th> Match Type</th>
                            <th> Tournament Name</th>
                            <th> Start Date &amp; Time</th>
                            <th> End Date &amp; Time</th>
                            <th> Location</th>
                            <th> Comments</th>
                        </tr>
                    </thead>

                    <tbody>
                        {matches.map((match , idx) => {
                            
                            return(     
                            <tr key={idx}>
                                <td> {match.team_one_name+" ("+match.team_one_position+" )"}</td>
                                <td> {match.team_two_name+" ("+match.team_two_position+" )"}</td>
                                <td> {match.match_type}</td>
                                {match.tournament_name !== undefined &&
                                    <td> {match.tournament_name}</td>
                                }
                                {match.tournament_name === undefined &&
                                    <td> - </td>
                                }
                                <td> {transform_date(match.start_datetime)}</td>
                                <td> {transform_date(match.end_datetime)}</td>
                                <td> {match.location} </td>
                                <td> {match.comments}</td>
                            </tr>

                            )

                        })}
                    </tbody>
                </table>
            }

            { matches.length === 0 &&
                <span> No scheduled matches yet </span>
            }
        </div>    
    )
}
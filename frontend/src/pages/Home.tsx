import Session from "supertokens-auth-react/recipe/session";
import { useEffect } from 'react';
import WritingGroupQuotesGrid from "../components/WritingGroupQuotesGrid";
import {
Typography,
Grid,
Card,
CardHeader,
CardContent,
Container, 
Stack,
Chip
} from "@mui/material";

export default function Dashboard() {
    useEffect(() => {
        const fetchUserId = async() => {
            const userId = await Session.getUserId();
            //create the user in the db
            console.log("Logged in as user:", userId);
        }
        fetchUserId();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ pb: 1 }}>
            <Typography sx={{pt:2, fontFamily: "Courier New"}} variant="h4" align="left" gutterBottom>
            <span
              style={{
                fontFamily: "Courier New",//"Thebarstaindemo",
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#333",
                marginLeft: "0.5rem",
              }}
            >
                Welcome to forWriters
            </span>
            </Typography>
            <Typography  sx={{p:0, ml: "37px"}} variant="h6" align="left" gutterBottom>
                <span
              style={{
                fontFamily: "Courier New",
                fontSize: "18pt",
                fontWeight: 600,
                color: "#333",
                // marginLeft: "0.5rem",
                marginLeft: "-0.5rem",
              }}
            >How do we feel about criticism?</span>
            </Typography>
            <WritingGroupQuotesGrid/>
            
            <Card variant="outlined" sx={{ height: "100%", maxWidth:"1000px",ml: "25px"  }}>
              <CardHeader title="Our Mission"/>
              <CardContent>
                <Typography variant="body1" sx={{  mb: 0 }}>
                 <span style={{fontWeight: "bold"}}>forWriters</span> was designed, from top to bottom, to make the process
                 of critiquing manuscripts as streamlined as possible.<br/>
                 Using this site, writers can perform the necessary tasks for turning good writing into great writing:<br/><br/>

                 <span style={{fontWeight: "bold"}}>Writing Groups:</span>
                 <div>Members can:</div>
                 <ul>
                    <li>Create writing groups</li>
                    <li>Search for writing groups</li>
                    <li>Join existing writing groups (once approved)</li>
                    <li>Invite others to join your writing group </li>
                    <li>Administrators of a writing group can:
                        <ul>
                            <li>Maintain the group's information (name, address, social media urls, etc.)</li>
                            <li>Add news posts</li>
                            <li>Set up Readings</li>
                        </ul>
                    </li>
                    <li>Writing groups can host many members, or just one writer and one reader.</li>
                    <li>Writing groups can be set to private so the forWriters search engine will ignore them.</li>
                 </ul>  
                </Typography>

               <span style={{fontWeight: "bold"}}>Manuscripts/File Management:</span>
              <div>Writers can upload as many manuscripts or other documents as they like, so long as they are PDFs or DOCXs.</div>
              <div>They can also:</div>
              <ul>
                <li>Preview, download, edit, or delete their manuscripts.</li>
                <li>Easily share manuscripts with other writers, readers, or writing groups.</li>
                <li>Make manuscripts searchable and findable by other forWriters members.</li>
              </ul>
              <span style={{fontWeight: "bold"}}>Readings:</span>
              <ul>
                <li>Readings are created by the administrator of a writing group.</li>
                <li>Administrators can set the reading's name, description, date, start time, end time, submission deadline, 
                    number of authors, and how often the same writer can sign up.</li>
                <li>Members of a writing group can view the reading schedule and then sign up for a reading.</li>
                <li>The schedule will tell them how many open spots a reading has and when it is full.</li>
             </ul>
             <span style={{fontWeight: "bold"}}>Feedback:</span>
             <div>Soliciting and managing feedback is the strength of forWriters. Many writers prefer to add inline 
                comments to an MS Word document and deliver that to the author. Keeping with this method, submitting feedback to 
                an author involves:
                <ul>
                    <li>Downloading the author's manuscript from the Readings page.</li>
                    <li>Adding inline feedback as comments.</li>
                    <li>Reviewers can also add freeform feedback.</li>
                    <li>Uploading the annotated MS Word document through the reading.</li>
                    <li>Once the feedback document has been uploaded, forWriters extracts all comments from the documents and presents
                        them to the author on the Readings page in an easy-to-read list.
                    </li>
                    <li>Authors can also download a zip file containing all the MS Word feedback documents.</li>
                </ul>
                </div>
              </CardContent>
            </Card>
            <Grid>
          </Grid>
        </Container>
    );
}

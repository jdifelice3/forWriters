import Session from "supertokens-auth-react/recipe/session";
import { useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import WritingGroupQuotesGrid from "../components/WritingGroupQuotesGrid";
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Container
} from "@mui/material";

export default function Dashboard() {
    const { user, isLoading } = useUserContext();

    return (
        <Container maxWidth="lg" sx={{ pb: 1 }}>
            <Typography sx={{pt:2, fontFamily: "Courier New"}} variant="h4" align="left" gutterBottom>
            <span
              style={{
                fontFamily: "Courier New",//"Thebarstaindemo",
                fontSize: "2.3rem",
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
                fontSize: "17pt",
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

                 <div style={{fontWeight: "bold"}}>Writing Groups:</div>
                    <span>Writing groups can host many members, or just one writer and one reader.</span>
                    <span>Writing groups can be set to private so the forWriters search engine will ignore them.</span>
                <br/><br/>
                 <div>Members can:</div>
                 <ul style={{marginTop: "-1px"}}>
                    <li>Create writing groups</li>
                    <li>Search for writing groups</li>
                    <li>Join existing writing groups (once approved)</li>
                    <li>Invite others to join your writing group </li>
                </ul>
                <div>Administrators of a writing group can:</div>
                    <ul style={{marginTop: "-1px"}}>
                        <li>Maintain the group's information (name, address, social media urls, etc.)</li>
                        <li>Add news posts</li>
                        <li>Set up Readings</li>
                    </ul>
                </Typography>

               <span style={{fontWeight: "bold"}}>Manuscripts/File Management:</span>
              <div>Writers can upload manuscripts or other documents per their membership, so long as they are PDFs or DOCXs.</div>
              <div>They can also:</div>
              <ul>
                <li>Preview, download, edit, or delete their manuscripts.</li>
                <li>Easily share manuscripts with other writers, readers, or writing groups.</li>
                <li>Make manuscripts searchable and findable by other forWriters members.</li>
              </ul>
              <div style={{fontWeight: "bold"}}>Authorship:</div>
                <span>Depending on your membership level, the following tools are available to you:</span>
                    <ul>
                        <li>Plagiarism Detection. Detecting plagarism has been an age-old task of any publisher. Now, it is easier
                            than ever. Sometimes author's include the work of other writers without realizing it. It's best to 
                            check before you submit.
                        </li>
                        <li>AI Detection. This is an ever-increasing concern. Many publishers now check for AI-content 
                            on a routine basis. If you've ever used an AI Detection tool, you were probably surprised by 
                            what it flagged as AI content. As with plagarism, it's best to get ahead of it.
                        </li>
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

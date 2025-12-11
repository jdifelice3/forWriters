import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

type Quote = {
  author: string;
  text: string;
  source?: string;
};

const QUOTES: Quote[] = [
  {
    author: "John Gardner",
    text: "A writer needs readers who will tell him what is wrong, not what is right.",
    source: "On teaching & critique (paraphrased)",
  },
//   {
//     author: "John Gardner",
//     text: "Fiction is a continuous dream; you need other eyes to tell you when they’ve been woken from it.",
//     source: "The Art of Fiction (paraphrased idea)",
//   },
  {
    author: "Anne Lamott",
    text: "You don’t have to write alone. You’re not supposed to.",
    source: "Bird by Bird (paraphrased idea)",
  },
  {
    author: "Stephen King",
    text: "Write with the door closed; rewrite with the door open.",
    source: "On Writing",
  },
  {
    author: "Ursula K. Le Guin",
    text: "We all need editors. Even Homer needed editors.",
    source: "Steering the Craft (paraphrased idea)",
  },
//   {
//     author: "Neil Gaiman",
//     text: "When people tell you something’s wrong or doesn’t work for them, they’re almost always right.",
//     source: "Writing advice",
//   },
  
//   {
//     author: "Ray Bradbury",
//     text: "I don’t believe in being alone. I believe in libraries, in communities.",
//     source: "On creative community (paraphrased idea)",
//   },
  {
    author: "Margaret Atwood",
    text: "You need someone to tell you, ‘This is great,’ and someone else to tell you, ‘This is terrible.’",
    source: "On revision & feedback",
  },
//   {
//     author: "C. S. Lewis",
//     text: "Two heads are better than one because they are unlikely to go wrong in the same direction.",
//     source: "Mere Christianity",
//   },
  {
    author: "James Baldwin",
    text: "You discover that your pain and heartbreak are not unique when you read—and when you are read.",
    source: "On being read (paraphrased idea)",
  },
];

const WritingGroupQuotesGrid = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {QUOTES.map((quote, index) => (
          <Grid
            key={`${quote.author}-${index}`}
           
          >
            <Card variant="outlined" sx={{ height: "100%", maxWidth:"500px" }}>
              <CardHeader title={quote.author} />

              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                  “{quote.text}”
                </Typography>

                {quote.source && (
                  <Stack direction="row">
                    <Chip label={quote.source} size="small" />
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default WritingGroupQuotesGrid;
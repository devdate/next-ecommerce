import { Box, Card, Container, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function About() {
  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container padding="20px 16px">
        <Grid
          item
          sm={12}
          md={6}
          sx={{
            width: "100%",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "402px",
              width: "100%",
            }}
          >
            <Image
              priority
              src="/images/me/me.jpg"
              alt="myself"
              fill
              style={{
                objectFit: "cover",
                borderRadius: "5%",
              }}
            ></Image>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          sx={{ position: "relative" }}
          marginTop={{ xs: 4, sm: 4, md: 0, lg: 0 }}
          paddingLeft={{ xs: 0, sm: 0, md: 4, lg: 4 }}
          paddingRight={{ xs: 0, sm: 0, md: 4, lg: 4 }}
        >
          <Card
            sx={{
              textAlign: "center",
              padding: "24px",
              wordWrap: "break-word",
            }}
          >
            <Typography
              variant="h6"
              borderBottom={1}
              textAlign="center"
              marginBottom={4}
            >
              Tariq Anwar
            </Typography>

            <Typography
              variant="body1"
              textAlign="center"
              sx={{ wordBreak: "break-word" }}
            >
              Young mind from Bangalore, passionate in Web Development and UI
              Development.
              <br />
              <br />
              Contact: &nbsp;
              <Link href="mailto:tariqanwar5897@gmail.com" target="_blank">
                tariqanwar5897@gmail.com
              </Link>
              <br />
              LinkedIn: &nbsp;
              <Link
                href="https://www.linkedin.com/in/tariqanwar5897/"
                target="_blank"
              >
                https://www.linkedin.com/in/tariqanwar5897/
              </Link>
              <br />
              <br />
              This project is built using ReactJS, NextJS and MaterialUI as a
              Proof Of Concept
              <br />
              <br />
              Project Link: &nbsp;
              <Link
                href=" https://github.com/devdate/next-ecommerce"
                target="_blank"
              >
                https://github.com/devdate/next-ecommerce
              </Link>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;

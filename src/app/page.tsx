"use client";

import { Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Import our new components
import HeroSection from "@/components/HeroSection";
import DataCard from "@/components/DataCard";
import StatCard from "@/components/StatCard";
import Section from "@/components/Section";
import ImpactItem from "@/components/ImpactItem";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Data Insights Section */}
      <Section
        title="Data Insights"
        subtitle="Explore our data insights below"
        spacing={3}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DataCard
            title="Caseloads in Texas"
            linkText="Read More About Caseloads"
            linkHref="/caseloads"
            isDark={true}
          >
            <Typography component="p">
              Whether someone accused of a crime hires an attorney or is
              appointed one depends on a lot of factors. The accused may have
              more money and resources to afford an attorney.
            </Typography>
          </DataCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DataCard
            title="Outcomes in Texas"
            linkText="Read More About Outcomes"
            linkHref="/outcomes"
            isDark={false}
          >
            <Typography component="p">
              Whether someone accused of a crime hires an attorney or is
              appointed one depends on a lot of factors. The accused may have
              more money and resources to afford an attorney.
            </Typography>
          </DataCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DataCard
            title="Demographics in Texas"
            linkText="Read More About Demographics"
            linkHref="/demographics"
            isDark={true}
          >
            <Typography component="p">
              The demographic makeup of defendants in the criminal justice
              system often doesn&apos;t reflect the general population. Data
              shows disparities in representation across racial, ethnic, and
              socioeconomic lines.
            </Typography>
          </DataCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DataCard
            title="Resources in Texas"
            linkText="Read More About Resources"
            linkHref="/resources"
            isDark={false}
          >
            <Typography component="p">
              Public defender offices across Texas face varying levels of
              funding and resource allocation. Some counties have robust systems
              with adequate staffing and support, while others struggle with
              overwhelming caseloads.
            </Typography>
          </DataCard>
        </Grid>
      </Section>

      {/* Case Lifecycle Section */}
      <Section spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Something about lifecycle of a case?
          </Typography>
          <Typography mb="1rem">
            Indigent defense data plays a crucial role in enhancing
            accountability within the legal system. By tracking the performance
            of public defenders, we can ensure they provide quality
            representation and adhere to ethical standards. However, many public
            defenders are overwhelmed by excessive case loads, which compromises
            their ability to effectively advocate for their clients. This
            transparency not only promotes trust in the system but also holds
            defenders responsible for their work, ultimately benefiting those
            they represent.
          </Typography>
          <Typography>
            Moreover, analyzing this data allows for better resource allocation
            and policy development. The shortage of public defenders leads to
            unequal access to justice, as many defendants are left with
            inadequate representation. By identifying trends and areas of need,
            we can direct resources more effectively to public defense services.
            Data-driven insights inform policymakers about the effectiveness of
            indigent defense systems, guiding necessary reforms and improvements
            that promote fairness and equity in justice.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard
            value="87%"
            description="of criminal cases in Texas are handled by appointed attorneys"
          />
        </Grid>
      </Section>

      {/* Impact Section */}
      <Section spacing={4} marginBottom={8}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Impact of data-driven tools
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            <ImpactItem title="Improved Access to Justice">
              <Typography>
                By highlighting disparities in public defense representation,
                data can drive policies that ensure more equitable legal
                representation for all, particularly for marginalized
                communities.
              </Typography>
            </ImpactItem>

            <ImpactItem title="Policy Reform">
              <Typography>
                With evidence-backed insights, researchers and policymakers can
                advocate for reforms that reduce systemic biases, improve legal
                outcomes, and ensure fairer sentencing and treatment of
                defendants.
              </Typography>
            </ImpactItem>

            <ImpactItem title="Transparency and Accountability">
              <Typography>
                Data sheds light on inefficiencies and inequalities within the
                criminal justice system, promoting greater accountability among
                public institutions and legal professionals.
              </Typography>
            </ImpactItem>

            <ImpactItem title="Reduction in Mass Incarceration">
              <Typography>
                By identifying patterns in over-policing or harsh sentencing,
                data can support efforts to reduce unnecessary imprisonment,
                benefiting individuals, families, and communities.
              </Typography>
            </ImpactItem>

            <ImpactItem title="Community Empowerment">
              <Typography>
                Educating the public about the state of public defense and legal
                representation empowers communities to push for reforms and
                advocate for their rights.
              </Typography>
            </ImpactItem>

            <ImpactItem title="Resource Allocation">
              <Typography>
                Data helps direct resources, like funding and staffing, to
                underserved public defender offices, ensuring better support for
                both defenders and defendants.
              </Typography>
            </ImpactItem>

            <Typography>
              Overall, the social impact is about creating a more just, fair,
              and transparent criminal justice system that better serves all
              citizens.
            </Typography>
          </Stack>
        </Grid>
      </Section>
    </main>
  );
}

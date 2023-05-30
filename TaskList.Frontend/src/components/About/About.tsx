import { Persona, PersonaSize } from "@fluentui/react";
import "./About.css";
import { AboutSection } from "./AboutSection";

export const About = () => {
  return (
    <div className="aboutContainer">
      <div className="col">
        <Persona
          imageUrl={
            "https://media.licdn.com/dms/image/D4E03AQHIfVfts9iBZQ/profile-displayphoto-shrink_800_800/0/1682434811899?e=1689811200&v=beta&t=dp9lBsYixderNiS-dx0kviX3SY8zsS_0K0e__nXSjcw"
          }
          text={"Developed by Peter Cox"}
          secondaryText={"Full Stack C# + React Developer"}
          size={PersonaSize.size120}
        />
      </div>

      <div className="col">
        <p>
          A rather thrown together full-stack application that provides CRUD
          functionality for storing customers.
        </p>

        <AboutSection
          text="Tech Used"
          bulletPoints={[
            "Backend - ASP.NET Core Web API with Entity Framework Core",
            "Frontend - ReactJS with Fluent UI, and especially Tanstack Query",
          ]}
        />

        <AboutSection
          text="Features"
          bulletPoints={[
            "CRUD operations for customers",
            "Sorting and filtering",
            "Pagination",
            "Validation",
            "Modals",
          ]}
        />
      </div>

      <div className="col">
        <AboutSection
          text="Frontend Todos"
          bulletPoints={[
            "Add storybook for the various components",
            "Add unit tests for the 'Util' helper classes",
            "Demonstrate React routing knowledge, rather than using Modals",
            "Make it responsive",
            "Add search functionality",
            "Add filtering by job description etc",
          ]}
        />

        <AboutSection
          text="Backend Todos"
          bulletPoints={[
            "Decoupled validation from the controllers (and moved to service)",
            "Add unit tests for services",
            "Move repositories and servces into seperate projects",
            "Use a real SQL DB rather than an in-memory EF core DB",
            "Add pagination server-side",
            "Add seeding (couldnt get it to work)",
          ]}
        />
      </div>
    </div>
  );
};


const GITHUB_USERNAME = "Dandlrt09"; // Change this to your actual GitHub username

export const fetchProjects = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        const data = await response.json();

        // Filter and transform data
        // You might want to filter only specific topics like 'portfolio' or 'data-science'
        // For now, we return all non-forked repos that have a description
        const projects = data
            .filter(repo => !repo.fork && repo.description)
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                homepage: repo.homepage,
                language: repo.language,
                stars: repo.stargazers_count,
                topics: repo.topics,
                updated_at: repo.updated_at
            }));

        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

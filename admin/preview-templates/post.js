import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.0.0-alpha.2/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <article>
          <header>
            <h2>${entry.getIn(["data", "titleintro"])}</h2>
            <h1>${entry.getIn(["data", "title"])}</h1>
            <p>
              <small>
                <time
                  >${
                    format(
                      entry.getIn(["data", "date"], new Date()),
                      "D. MM. YYYY"
                    )
                  }</time
                >
                ${", von"} ${entry.getIn(["data", "authorname"])}
              </small>
            </p>
          </header>

          <p class="__cms_description">${entry.getIn(["data", "description"], "")}</p>

          ${this.props.widgetFor("body")}

          <div class="tags">
            <h3>Schlagwörter</h3>
            <p>
              ${
                entry.getIn(["data", "tags"], []).map(
                  tag =>
                    html`
                      <a href="#" rel="tag">${tag}</a>
                    `
                )
              }
            </p>
          </div>
        </article>
      </main>
    `;
  }
});

export default Post;

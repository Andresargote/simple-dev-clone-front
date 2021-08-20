import { useState } from "react";
import router, { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { updatePost } from "../services/post";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "../styles/TextEditor.module.scss";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.menu}>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? styles.isActive
            : styles.button
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? styles.isActive
            : styles.button
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? styles.isActive
            : styles.button
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? styles.isActive
            : styles.button
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? styles.isActive
            : styles.button
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? styles.isActive : styles.button}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? styles.isActive : styles.button}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? styles.isActive : styles.button
        }
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? styles.isActive : styles.button
        }
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote") ? styles.isActive : styles.button
        }
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock") ? styles.isActive : styles.button
        }
      >
        code block
      </button>
    </div>
  );
};

export default function EditPostEditor({ post, token }) {
  const [title, setTitle] = useState(post.title);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: post.content,
  });

  const handlePublic = async () => {
    setLoading(true);

    const content = {
      title: title,
      content: editor.getHTML(),
    };

    const result = await updatePost(token, post.slug, content);

    if (result?.error?.response.data.error) {
      setLoading(false);
      setError(result.error.response.data.error);
    } else {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <>
      <div className={styles.textContainer}>
        <MenuBar editor={editor} />
        {error !== "" && <p className="Error">⚠️ {error}</p>}
        {loading && (
          <Loader
            type="ThreeDots"
            color="#48bb78"
            height={25}
            width={50}
            style={{ margin: "5px auto", textAlign: "center" }}
          />
        )}
        <input
          value={title}
          type="text"
          required
          placeholder="New post title here..."
          className={styles.title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <EditorContent editor={editor} />
      </div>
      <button className={styles.publicButton} onClick={handlePublic}>
        Edit
      </button>
    </>
  );
}

from docx2pdf import convert

# Convert a single file
convert("input.docx", "output.pdf")

# Or convert every .docx in a folder:
# convert("C:/path/to/source_folder", "C:/path/to/output_folder")

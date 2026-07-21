from fpdf import FPDF
import sys

def txt_to_pdf(input_file, output_file):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=10)
    
    with open(input_file, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            # Replace characters that Arial can't handle or encode gracefully
            line = line.encode('latin-1', 'replace').decode('latin-1')
            pdf.multi_cell(0, 5, txt=line)
            
    pdf.output(output_file)

if __name__ == "__main__":
    txt_to_pdf(sys.argv[1], sys.argv[2])

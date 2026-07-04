from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[2]
TMP_DIR = ROOT / "tmp" / "pdfs"
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_PDF = OUTPUT_DIR / "arrk_raj_internship_report.pdf"

SAMPLE_REPORT = Path(r"C:\Users\acer\Downloads\report_edited (1).pdf")
OFFER_LETTER = Path(r"C:\Users\acer\Downloads\OfferLetter_Arrk Raj.pdf")

PAGE_WIDTH, PAGE_HEIGHT = letter
RED = colors.HexColor("#c32121")
GRAY = colors.HexColor("#555555")


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def render_pdf_pages(pdf_path: Path, out_dir: Path, scale: float = 2.0) -> list[Path]:
    ensure_dir(out_dir)
    pages = []
    pdf = pdfium.PdfDocument(str(pdf_path))
    for index in range(len(pdf)):
        out_path = out_dir / f"page-{index + 1}.png"
        if not out_path.exists():
            page = pdf[index]
            pil_image = page.render(scale=scale).to_pil()
            pil_image.save(out_path)
        pages.append(out_path)
    return pages


def crop_assets(sample_page_1: Path, sample_page_2: Path, asset_dir: Path) -> dict[str, Path]:
    ensure_dir(asset_dir)
    page1 = Image.open(sample_page_1)
    page2 = Image.open(sample_page_2)

    assets = {
        "vtu_logo": asset_dir / "vtu_logo.png",
        "gat_cover": asset_dir / "gat_cover_logos.png",
        "gat_cert": asset_dir / "gat_cert_logos.png",
    }

    if not assets["vtu_logo"].exists():
        page1.crop((520, 240, 715, 440)).save(assets["vtu_logo"])
    if not assets["gat_cover"].exists():
        page1.crop((455, 1020, 780, 1160)).save(assets["gat_cover"])
    if not assets["gat_cert"].exists():
        page2.crop((470, 250, 780, 445)).save(assets["gat_cert"])

    return assets


def get_styles() -> dict[str, ParagraphStyle]:
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="BodyJustify",
            parent=styles["Normal"],
            fontName="Times-Roman",
            fontSize=13.7,
            leading=20,
            alignment=TA_JUSTIFY,
            firstLineIndent=24,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyCenter",
            parent=styles["Normal"],
            fontName="Times-Roman",
            fontSize=13.7,
            leading=20,
            alignment=TA_CENTER,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletBody",
            parent=styles["Normal"],
            fontName="Times-Roman",
            fontSize=13.3,
            leading=18,
            alignment=TA_LEFT,
            leftIndent=34,
            firstLineIndent=0,
            bulletIndent=18,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubBody",
            parent=styles["Normal"],
            fontName="Times-Roman",
            fontSize=13.3,
            leading=18,
            alignment=TA_JUSTIFY,
            leftIndent=22,
            firstLineIndent=0,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TOCEntry",
            parent=styles["Normal"],
            fontName="Times-Bold",
            fontSize=13.2,
            leading=18,
            alignment=TA_LEFT,
            spaceAfter=8,
        )
    )
    return styles


def draw_double_border(c: canvas.Canvas) -> None:
    c.setLineWidth(2.0)
    c.rect(18, 18, PAGE_WIDTH - 36, PAGE_HEIGHT - 36)
    c.setLineWidth(0.8)
    c.rect(22, 22, PAGE_WIDTH - 44, PAGE_HEIGHT - 44)


def draw_centered_paragraph(c: canvas.Canvas, text: str, style: ParagraphStyle, x: float, top: float, width: float) -> float:
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, 2000)
    paragraph.drawOn(c, x, top - height)
    return height


def draw_paragraph(c: canvas.Canvas, text: str, style: ParagraphStyle, x: float, top: float, width: float) -> float:
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, 2000)
    paragraph.drawOn(c, x, top - height)
    return height


def draw_bullet(c: canvas.Canvas, text: str, style: ParagraphStyle, x: float, top: float, width: float) -> float:
    paragraph = Paragraph(text, style, bulletText="•")
    _, height = paragraph.wrap(width, 2000)
    paragraph.drawOn(c, x, top - height)
    return height


def header_footer(c: canvas.Canvas, page_number: int) -> None:
    c.setFont("Times-Italic", 12)
    c.drawString(62, PAGE_HEIGHT - 42, "INTERNSHIP")
    c.drawRightString(PAGE_WIDTH - 62, PAGE_HEIGHT - 42, "SMARTED")
    c.setLineWidth(2.0)
    c.line(62, PAGE_HEIGHT - 52, PAGE_WIDTH - 62, PAGE_HEIGHT - 52)
    c.line(62, 72, PAGE_WIDTH - 62, 72)
    c.setFont("Times-Roman", 11)
    c.drawString(62, 56, "Dept. of CSE(AI&ML), GAT")
    c.drawCentredString(PAGE_WIDTH / 2, 56, "2025-26")
    c.drawRightString(PAGE_WIDTH - 62, 56, f"Page {page_number}")


def draw_section_heading(c: canvas.Canvas, title: str, y: float) -> None:
    c.setFont("Times-Bold", 20)
    c.drawCentredString(PAGE_WIDTH / 2, y, title)


def build_cover_page(c: canvas.Canvas, assets: dict[str, Path]) -> None:
    draw_double_border(c)

    c.setFont("Times-Bold", 23)
    c.drawCentredString(PAGE_WIDTH / 2, 742, "VISVESVARAYA TECHNOLOGICAL UNIVERSITY")
    c.setFont("Times-Bold", 18)
    c.drawCentredString(PAGE_WIDTH / 2, 713, "“Jnana Sangama”, Belagavi, Karnataka, INDIA")

    c.drawImage(ImageReader(str(assets["vtu_logo"])), 251, 565, width=110, height=110, preserveAspectRatio=True, mask="auto")

    c.setFont("Times-Roman", 18)
    c.drawCentredString(PAGE_WIDTH / 2, 540, "Internship Report")
    c.drawCentredString(PAGE_WIDTH / 2, 524, "for")

    c.setFillColor(RED)
    c.setFont("Times-BoldItalic", 19)
    c.drawCentredString(PAGE_WIDTH / 2, 493, "SmartED Innovations")
    c.setFillColor(colors.black)

    c.setFont("Times-Italic", 13)
    c.drawCentredString(
        PAGE_WIDTH / 2,
        462,
        "Submitted in partial fulfilment of the requirement for the award of the degree of",
    )

    c.setFont("Times-Bold", 14)
    c.drawCentredString(PAGE_WIDTH / 2, 439, "Bachelor of Engineering")
    c.drawCentredString(PAGE_WIDTH / 2, 424, "in")
    c.drawCentredString(PAGE_WIDTH / 2, 409, "Computer Science and Engineering(AI & ML)")

    c.setFont("Times-Italic", 14)
    c.drawCentredString(PAGE_WIDTH / 2, 378, "Submitted By")
    c.setFont("Times-Roman", 13)
    c.drawString(170, 340, "ARRK RAJ")
    c.drawString(332, 340, "USN: _________________")

    c.setFont("Times-Italic", 14)
    c.drawCentredString(PAGE_WIDTH / 2, 302, "Under the Guidance of")
    c.setFillColor(RED)
    c.setFont("Times-Bold", 18)
    c.drawCentredString(PAGE_WIDTH / 2, 286, "PROF. JAYASHRI BADIGER")
    c.setFont("Times-Roman", 13)
    c.drawCentredString(PAGE_WIDTH / 2, 271, "Assistant Professor, CSE(AIML)")
    c.setFillColor(colors.black)

    c.drawImage(ImageReader(str(assets["gat_cover"])), 218, 188, width=180, height=78, preserveAspectRatio=True, mask="auto")

    c.setFont("Times-Bold", 15)
    c.drawCentredString(PAGE_WIDTH / 2, 152, "Department of Computer Science and Engineering(AI & ML)")
    c.setFont("Times-Bold", 19)
    c.drawCentredString(PAGE_WIDTH / 2, 135, "GLOBAL ACADEMY OF TECHNOLOGY")
    c.setFont("Times-Roman", 11.5)
    c.drawCentredString(PAGE_WIDTH / 2, 120, "(Autonomous Institute, Affiliated to VTU, Belagavi)")
    c.drawCentredString(PAGE_WIDTH / 2, 106, "Rajarajeshwarinagar, Bengaluru - 560 098")
    c.setFont("Times-Bold", 11.5)
    c.drawCentredString(PAGE_WIDTH / 2, 92, "2025 – 2026")

    c.showPage()


def build_certificate_page(c: canvas.Canvas, assets: dict[str, Path], styles: dict[str, ParagraphStyle]) -> None:
    draw_double_border(c)

    c.setFont("Times-Bold", 21)
    c.drawCentredString(PAGE_WIDTH / 2, 736, "GLOBAL ACADEMY OF TECHNOLOGY")
    c.setFont("Times-Roman", 10.2)
    c.drawCentredString(PAGE_WIDTH / 2, 721, "(Autonomous Institute, Affiliated to VTU, Belagavi)")
    c.drawCentredString(PAGE_WIDTH / 2, 708, "Rajarajeshwarinagar, Bengaluru - 560 098")
    c.setFont("Times-Bold", 16)
    c.drawCentredString(PAGE_WIDTH / 2, 690, "Department of Computer Science and Engineering(AI & ML)")

    c.drawImage(ImageReader(str(assets["gat_cert"])), 222, 575, width=170, height=106, preserveAspectRatio=True, mask="auto")

    c.setFont("Times-Bold", 22)
    c.drawCentredString(PAGE_WIDTH / 2, 530, "CERTIFICATE")

    body = (
        "Certified that <b>Arrk Raj</b>, bearing USN: <b>_________________</b>, of Global Academy of Technology, "
        "has undertaken the Internship Programme during the academic year 2025-2026. The internship is offered by "
        "<b>SmartED Innovations</b> for the role of <b>Business Growth Specialist</b>, with training start date "
        "<b>26-03-2026</b>, internship duration of <b>6 months</b>, and <b>Full-Time</b> mode of work. "
        "The internship report submitted to the department is based on the official offer letter and the structured "
        "training details covering customer understanding, business process familiarization, performance expectations, "
        "and professional growth. It is certified that all corrections and suggestions provided during the Internal "
        "Assessment have been incorporated in the final Internship Report submitted to the department. "
        "The report has been accepted as it meets the academic requirements prescribed for the Internship Programme."
    )
    draw_paragraph(c, body, styles["BodyJustify"], 82, 486, 448)

    signature_y = 164
    line_y = 177
    columns = [(112, 170), (292, 170), (472, 170)]
    names = [
        ("Prof. Jayashri Badiger", "Assistant Professor", "Dept. of CSE(AI&ML)", "GAT, Bengaluru."),
        ("Dr. Chandramma R", "Professor & Head", "Dept. of CSE(AI&ML)", "GAT, Bengaluru."),
        ("Dr. H. B. Balakrishna", "Principal", "GAT, Bengaluru.", ""),
    ]

    c.setLineWidth(0.8)
    for center_x, width in columns:
        c.line(center_x - width / 2, line_y, center_x + width / 2, line_y)

    for center_x, parts in zip([112, 306, 500], names):
        c.setFillColor(RED)
        c.setFont("Times-Bold", 10.6)
        c.drawCentredString(center_x, signature_y, parts[0])
        c.setFillColor(colors.black)
        c.setFont("Times-Roman", 9.6)
        c.drawCentredString(center_x, signature_y - 14, parts[1])
        c.drawCentredString(center_x, signature_y - 28, parts[2])
        if parts[3]:
            c.drawCentredString(center_x, signature_y - 42, parts[3])

    c.showPage()


def build_declaration_page(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    draw_double_border(c)

    c.setFont("Times-Bold", 18)
    c.drawCentredString(PAGE_WIDTH / 2, 736, "GLOBAL ACADEMY OF TECHNOLOGY")
    c.setFont("Times-Roman", 10)
    c.drawCentredString(PAGE_WIDTH / 2, 721, "(Autonomous Institute, Affiliated to VTU, Belagavi)")
    c.drawCentredString(PAGE_WIDTH / 2, 708, "Rajarajeshwarinagar, Bengaluru - 560 098")
    c.setFont("Times-Bold", 14.5)
    c.drawCentredString(PAGE_WIDTH / 2, 690, "DECLARATION")

    body = (
        "I, <b>Arrk Raj</b>, bearing USN: <b>_________________</b>, a student of Seventh Semester B.E, Department of "
        "Computer Science and Engineering (AI & ML), Global Academy of Technology, Rajarajeshwarinagar, Bengaluru, "
        "hereby declare that the Internship Work undertaken at <b>SmartED Innovations</b> for the role of "
        "<b>Business Growth Specialist</b> is submitted in partial fulfillment of the requirements for the Internship "
        "Programme prescribed for the award of the Bachelor of Engineering in Computer Science and Engineering "
        "(AI & ML) from Visvesvaraya Technological University, Belagavi, during the academic year 2025-2026."
    )
    draw_paragraph(c, body, styles["BodyJustify"], 88, 610, 436)

    c.setFont("Times-Roman", 12.5)
    c.drawString(98, 240, "ARRK RAJ")
    c.drawString(98, 222, "USN: _________________")
    c.drawString(98, 190, "Place: Bengaluru")
    c.drawString(98, 172, "Date: 26/03/2026")

    c.showPage()


def build_offer_letter_pages(c: canvas.Canvas, offer_images: list[Path]) -> None:
    for image_path in offer_images:
        c.drawImage(ImageReader(str(image_path)), 0, 0, width=PAGE_WIDTH, height=PAGE_HEIGHT, preserveAspectRatio=True)
        c.showPage()


def build_acknowledgement_page(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    c.setFont("Times-Bold", 22)
    c.drawCentredString(PAGE_WIDTH / 2, 720, "ACKNOWLEDGEMENT")

    paragraphs = [
        "I would like to express my sincere gratitude to everyone who supported me in undertaking my internship opportunity at <b>SmartED Innovations</b> as a <b>Business Growth Specialist</b>. This opportunity has provided me with meaningful exposure to business growth practices, customer engagement, training-based learning, performance-driven work culture, and professional accountability.",
        "I am grateful to the <b>management of Global Academy of Technology</b> for providing me with the opportunity and necessary support to undergo this internship as part of my academic curriculum.",
        "My heartfelt thanks to <b>Dr. Balakrishna H. B., Principal, Global Academy of Technology</b>, for his encouragement and for creating a learning environment that motivates students to pursue industry exposure.",
        "I express my sincere appreciation to <b>Dr. Chandramma R., Professor and Head, Department of CSE (AI & ML)</b>, for her continuous support and guidance throughout the internship process.",
        "I am deeply thankful to the leadership and training team at <b>SmartED Innovations</b> for offering me this opportunity and for clearly outlining expectations related to customer understanding, business process familiarization, payment-oriented performance targets, and professional conduct.",
        "I also extend my gratitude to everyone involved in the onboarding and training process for helping me understand how structured learning, communication discipline, and business responsibility contribute to organizational growth. Finally, I express my special thanks to my college guide, <b>Prof. Jayashri Badiger, Assistant Professor, Department of CSE (AI & ML)</b>, for her consistent support, valuable feedback, and guidance during the preparation of this internship report.",
    ]

    y = 664
    for paragraph in paragraphs:
        y -= draw_paragraph(c, paragraph, styles["BodyJustify"], 88, y, 436) + 4

    c.setFont("Times-Roman", 12)
    c.drawString(240, 108, "ARRK RAJ")
    c.drawRightString(520, 108, "USN: _________________")
    c.drawCentredString(PAGE_WIDTH / 2, 26, "i")

    c.showPage()


def build_toc_page(c: canvas.Canvas) -> None:
    c.setFont("Times-Bold", 20)
    c.drawCentredString(PAGE_WIDTH / 2, 720, "TABLE OF CONTENTS")

    c.setFont("Times-Bold", 14)
    c.drawString(250, 654, "Particulars")
    c.drawRightString(516, 654, "Page. No")

    c.setFont("Times-Bold", 14)
    c.drawString(120, 622, "Acknowledgement")
    c.drawRightString(516, 622, "i")
    c.drawString(120, 590, "Table of Contents")
    c.drawRightString(516, 590, "ii")

    entries = [
        ("1", "Introduction", "1"),
        ("2", "Organization Profile", "1"),
        ("3", "Internship Details", "1"),
        ("4", "Objectives of the Internship", "2"),
        ("", "Work Roles and Activities Undertaken", "2"),
        ("", "Learning Outcomes", "3"),
        ("", "Technical Exposure", "4"),
        ("", "Industrial Exposure", "4"),
        ("", "Role Contribution", "4"),
        ("", "Skills Gained", "5"),
        ("", "Conclusion", "6"),
    ]

    y = 530
    for number, label, page_no in entries:
        if number:
            c.setFont("Times-Bold", 14)
            c.drawString(82, y, number)
        c.setFont("Times-Bold" if label != "Conclusion" else "Times-Bold", 14)
        c.drawString(120, y, label)
        c.drawRightString(516, y, page_no)
        y -= 31

    c.setFont("Times-Roman", 12)
    c.drawCentredString(PAGE_WIDTH / 2, 24, "ii")

    c.showPage()


def build_body_page_1(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    header_footer(c, 1)
    y = 705

    draw_section_heading(c, "INTRODUCTION", y)
    y -= 44
    intro = (
        "This internship report outlines the opportunity associated with my internship at SmartED Innovations, "
        "beginning with on-the-job training from 26-03-2026 and extending into a six-month internship period. "
        "As a Seventh Semester B.E student in Computer Science and Engineering (AI & ML) at Global Academy of "
        "Technology, this role gives me practical exposure to business growth processes, customer interaction, "
        "payment-oriented performance expectations, and professional work discipline within an edtech environment."
    )
    y -= draw_paragraph(c, intro, styles["BodyJustify"], 88, y, 436) + 18

    draw_section_heading(c, "ORGANIZATION PROFILE", y)
    y -= 44
    org = (
        "SmartED Innovations is presented in the offer letter as a structured and merit-driven organization where "
        "employees are expected to understand the company’s products, customers, and business processes in a practical "
        "way. The role design, training period, incentives, and performance targets indicate a business environment "
        "focused on disciplined execution, customer conversion, and measurable outcomes."
    )
    y -= draw_paragraph(c, org, styles["BodyJustify"], 88, y, 436) + 12
    org_2 = (
        "The company’s approach emphasizes professional accountability, confidentiality, communication standards, and "
        "consistent performance. This makes the internship relevant for students who want to understand how growth "
        "functions operate in a product-driven and customer-facing organization."
    )
    y -= draw_paragraph(c, org_2, styles["BodyJustify"], 88, y, 436) + 20

    draw_section_heading(c, "INTERNSHIP DETAILS", y)
    y -= 40
    details = [
        "<b>Organization:</b> SmartED Innovations",
        "<b>Role:</b> Business Growth Specialist",
        "<b>Training Period:</b> 26-03-2026 to 04-04-2026",
        "<b>Internship Duration:</b> 6 Months",
        "<b>Work Mode:</b> Full-Time, Bangalore",
        "<b>Working Hours:</b> 9 Hours per day (including lunch break)",
        "<b>Stipend:</b> Rs. 17,000 per month with performance-based incentives",
    ]
    for item in details:
        y -= draw_bullet(c, item, styles["BulletBody"], 92, y, 432) + 1

    c.showPage()


def build_body_page_2(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    header_footer(c, 2)
    y = 705

    draw_section_heading(c, "OBJECTIVES OF THE INTERNSHIP", y)
    y -= 40
    objectives = [
        "To understand the company’s products, customers, and core business processes during the structured training period.",
        "To develop professional communication and customer-facing confidence in a target-driven environment.",
        "To learn how payment conversions, follow-ups, and performance measurement support business growth.",
        "To improve discipline in attendance, time management, reporting, and workplace accountability.",
        "To understand confidentiality requirements and professional conduct expectations in a corporate setting.",
        "To build readiness for long-term career growth through practical exposure and consistent performance.",
    ]
    for item in objectives:
        y -= draw_bullet(c, item, styles["BulletBody"], 92, y, 432) + 1

    y -= 8
    draw_section_heading(c, "WORK ROLES AND ACTIVITIES UNDERTAKEN", y)
    y -= 38

    sections = [
        ("1. Product and Process Familiarization", [
            "Understanding the company’s products, business model, and customer-facing workflow during OJT.",
            "Learning how structured training helps in taking ownership of assigned responsibilities after confirmation.",
        ]),
        ("2. Customer Interaction Readiness", [
            "Developing communication discipline required for speaking with prospects and handling customer queries.",
            "Practising professional response standards, clarity in messaging, and confident presentation of offerings.",
        ]),
        ("3. Payment and Target Orientation", [
            "Understanding how successful payments contribute to monthly performance targets and role expectations.",
            "Observing how follow-up consistency, customer trust, and timely action influence conversion outcomes.",
        ]),
    ]
    for heading, bullets in sections:
        y -= draw_paragraph(c, f"<b>{heading}</b>", styles["SubBody"], 92, y, 432) + 1
        for item in bullets:
            y -= draw_bullet(c, item, styles["BulletBody"], 104, y, 420) + 1

    c.showPage()


def build_body_page_3(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    header_footer(c, 3)
    y = 698

    sections = [
        ("4. Professional Conduct and Confidentiality", [
            "Understanding the importance of confidentiality, company policies, and responsible handling of internal information.",
            "Recognizing how punctuality, behaviour, and professionalism influence performance review and growth opportunities.",
        ]),
        ("5. Career Growth Awareness", [
            "Learning how merit-based incentives and long-term career progression are linked to performance and consistency.",
            "Developing awareness of workplace ownership, initiative, and the value of measurable contribution.",
        ]),
    ]
    for heading, bullets in sections:
        y -= draw_paragraph(c, f"<b>{heading}</b>", styles["SubBody"], 92, y, 432) + 1
        for item in bullets:
            y -= draw_bullet(c, item, styles["BulletBody"], 104, y, 420) + 1

    y -= 22
    draw_section_heading(c, "LEARNING OUTCOMES", y)
    y -= 40
    outcomes = [
        "Better understanding of how structured training supports transition into business responsibilities.",
        "Clearer awareness of customer-facing communication, follow-up discipline, and conversion-oriented work.",
        "Improved understanding of target-based performance and incentive-driven growth models.",
        "Awareness of the importance of confidentiality, workplace ethics, and accountability in professional settings.",
        "Stronger readiness to adapt to full-time work culture and responsibility-based learning.",
    ]
    for item in outcomes:
        y -= draw_bullet(c, item, styles["BulletBody"], 92, y, 432) + 1

    c.showPage()


def build_body_page_4(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    header_footer(c, 4)
    y = 705

    draw_section_heading(c, "TECHNICAL EXPOSURE", y)
    y -= 40
    exposure = [
        "Exposure to digital communication and customer follow-up processes used in business growth roles.",
        "Understanding of payment tracking, response handling, and performance-based reporting needs.",
        "Awareness of structured documentation and information handling in a professional business environment.",
        "Basic exposure to organized workflow practices that support business continuity and target monitoring.",
    ]
    for item in exposure:
        y -= draw_bullet(c, item, styles["BulletBody"], 92, y, 432) + 1

    y -= 18
    draw_section_heading(c, "INDUSTRIAL EXPOSURE", y)
    y -= 40
    industrial = [
        "Understood how a growth-oriented organization connects training, performance, and accountability.",
        "Observed the importance of customer trust, professional conduct, and timely communication in business roles.",
        "Gained awareness of how incentives and targets shape motivation and day-to-day expectations.",
    ]
    for item in industrial:
        y -= draw_bullet(c, item, styles["BulletBody"], 92, y, 432) + 1

    y -= 18
    draw_section_heading(c, "ROLE CONTRIBUTION", y)
    y -= 40
    contribution = [
        "Preparing to contribute through disciplined communication and customer handling.",
        "Supporting payment-oriented growth goals through consistency, follow-up, and professional engagement.",
        "Building readiness to take ownership of assigned responsibilities after the training period.",
    ]
    for item in contribution:
        y -= draw_bullet(c, item, styles["BulletBody"], 92, y, 432) + 1

    c.showPage()


def build_body_page_5(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    header_footer(c, 5)
    y = 705

    draw_section_heading(c, "SKILLS GAINED", y)
    y -= 44

    groups = [
        ("Technical and Work Skills", [
            "Customer communication and follow-up discipline",
            "Target awareness and payment-conversion focus",
            "Structured documentation and information handling",
            "Professional reporting and workflow responsibility",
        ]),
        ("Professional Skills", [
            "Time management",
            "Confidence in communication",
            "Workplace discipline",
            "Accountability and ownership",
        ]),
        ("Business Exposure", [
            "Understanding of growth-oriented work culture",
            "Awareness of merit-driven performance systems",
            "Exposure to practical business process learning",
        ]),
    ]

    for heading, bullets in groups:
        y -= draw_paragraph(c, f"<b>{heading}</b>", styles["SubBody"], 92, y, 432) + 3
        for item in bullets:
            y -= draw_bullet(c, item, styles["BulletBody"], 104, y, 420) + 1
        y -= 8

    c.showPage()


def build_body_page_6(c: canvas.Canvas, styles: dict[str, ParagraphStyle]) -> None:
    header_footer(c, 6)
    y = 705

    draw_section_heading(c, "CONCLUSION", y)
    y -= 46

    conclusion_1 = (
        "The internship opportunity at SmartED Innovations as a Business Growth Specialist provides meaningful exposure "
        "to customer-oriented business processes, target-based work culture, and structured professional training. "
        "The offer letter clearly reflects a role that combines learning, performance expectations, and growth "
        "opportunities in a disciplined corporate environment."
    )
    y -= draw_paragraph(c, conclusion_1, styles["BodyJustify"], 88, y, 436) + 12

    conclusion_2 = (
        "Through the outlined training period, role structure, stipend model, incentives, and performance targets, "
        "this opportunity helps build practical understanding of how communication, accountability, and measurable "
        "results contribute to business growth. It strengthens my interest in developing professional confidence and "
        "applying organized, responsible work practices in real-world industry settings."
    )
    y -= draw_paragraph(c, conclusion_2, styles["BodyJustify"], 88, y, 436) + 12

    conclusion_3 = (
        "Overall, the internship serves as a valuable bridge between academic learning and workplace expectations, "
        "helping me prepare for future roles that require professionalism, ownership, and performance-oriented thinking."
    )
    draw_paragraph(c, conclusion_3, styles["BodyJustify"], 88, y, 436)

    c.showPage()


def main() -> None:
    ensure_dir(TMP_DIR)
    ensure_dir(OUTPUT_DIR)

    sample_render_dir = TMP_DIR / "sample_report_render"
    offer_render_dir = TMP_DIR / "offer_render"
    sample_pages = render_pdf_pages(SAMPLE_REPORT, sample_render_dir, scale=2.0)
    offer_pages = render_pdf_pages(OFFER_LETTER, offer_render_dir, scale=2.0)
    assets = crop_assets(sample_pages[0], sample_pages[1], TMP_DIR / "assets")
    styles = get_styles()

    pdf = canvas.Canvas(str(OUTPUT_PDF), pagesize=letter)
    build_cover_page(pdf, assets)
    build_certificate_page(pdf, assets, styles)
    build_declaration_page(pdf, styles)
    build_offer_letter_pages(pdf, offer_pages)
    build_acknowledgement_page(pdf, styles)
    build_toc_page(pdf)
    build_body_page_1(pdf, styles)
    build_body_page_2(pdf, styles)
    build_body_page_3(pdf, styles)
    build_body_page_4(pdf, styles)
    build_body_page_5(pdf, styles)
    build_body_page_6(pdf, styles)
    pdf.save()

    print(OUTPUT_PDF)


if __name__ == "__main__":
    main()

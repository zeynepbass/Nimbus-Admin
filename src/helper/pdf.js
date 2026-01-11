import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import formatDate from "@/helper/formatDate"

export const downloadOrderPDF = (order) => {
  const doc = new jsPDF()


  doc.setFontSize(18)
  doc.text("Siparis Faturasi", 14, 20)


  doc.setFontSize(11)
  doc.text(`Siparis No: ${order.id}`, 14, 30)
  doc.text(`Müsteri: ${order.customerName}`, 14, 36)
  doc.text(`Tarih: ${formatDate(order.createdAt)}`, 14, 42)
  doc.text(`Ödeme: ${order.paymentMethod}`, 14, 48)
  const timeline = order.timeline || [];
  const lastStep = timeline[timeline.length - 1];
  doc.text(`Durum: ${lastStep ? lastStep.label : "Bilinmiyor"}`, 14, 54);


  autoTable(doc, {
    startY: 65,
    head: [["Ürün", "Fiyat", "Adet", "Toplam"]],
    body: order.items.map((item) => [
      item.name,
      `₺${item.price}`,
      item.quantity,
      `₺${item.price * item.quantity}`,
    ]),
  })


  const subTotal = order.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )


  const finalY = doc.lastAutoTable.finalY + 10

  doc.text(`Genel Toplam: ₺${subTotal}`, 14, finalY)

  doc.setFontSize(13)



  doc.save(`siparis-${order.id}.pdf`)
}

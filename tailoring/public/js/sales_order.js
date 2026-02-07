frappe.ui.form.on('Sales Order', {
    customer: function(frm) {
        if (frm.doc.customer) {
            // Use get_list to strictly enforce the order
            frappe.db.get_list('Customer Measurement', {
                filters: { 'customer': frm.doc.customer },
                fields: ['name'],
                order_by: 'creation desc', // Forces the newest to the top
                limit: 1 // Only take the absolute latest one
            }).then(records => {
                if (records && records.length > 0) {
                    let latest_id = records[0].name;
                    
                    // Set the value with a slight delay to ensure UI stability
                    setTimeout(() => {
                        frm.set_value('custom_measurement', latest_id);
                        
                        frappe.show_alert({
                            message: __('Linked latest measurement: {0}', [latest_id]),
                            indicator: 'green'
                        });
                    }, 200);
                } else {
                    frm.set_value('custom_measurement', '');
                }
            });

            // Keep the filter for the dropdown
            frm.set_query('custom_measurement', function() {
                return {
                    filters: { 'customer': frm.doc.customer }
                };
            });
        }
    },

    // Triggered when the measurement ID is set
    custom_measurement: function(frm) {
        setTimeout(() => {
            toggle_measurement_fields(frm);
        }, 500);
    }
});

function toggle_measurement_fields(frm) {
    const measurement_fields = ['neck', 'chest', 'waist', 'shoulder', 'sleeve_length', 'garment_type', 'uom'];
    measurement_fields.forEach(field => {
        let val = frm.doc[field];
        let is_empty = !val || val === 0;
        frm.set_df_property(field, 'hidden', is_empty ? 1 : 0);
    });
}
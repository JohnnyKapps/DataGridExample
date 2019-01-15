$(document).ready(function() {
    var table = $('#example').DataTable( {
        initComplete: function () {

            this.api().columns().every( function () {
                var column = this;
                if(!$(column.footer()).hasClass('text-search-footer')){
                    var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                        .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                    } );
 
                    column.data().unique().sort().each( function ( d, j ) {
                        select.append('<option value="'+d+'">'+d+'</option>')
                    });
                }
                
            } );

            this.api().columns().every(function(){
                var column = this;
                $('input', column.footer() ).on('keyup change', function () {
                    if (column.search() !== this.value ) {
                        column
                        .search( this.value )
                        .draw();
                    }
                });

                $('select', column.footer()).on('change', function () {
                    if (column.search() !== this.value ) {
                        column
                        .search( this.value )
                        .draw();
                    }
                });
            });
        }
    } );


    // // Apply the search
    // table.columns().every( function () {
    //     var that = this;
 
    //     $( 'input', this.footer() ).on( 'keyup change', function () {
    //         if ( that.search() !== this.value ) {
    //             that
    //                 .search( this.value )
    //                 .draw();
    //         }
    //     } );
    // } );
} );
import React from 'react';
import {Header} from "../components/Header";
import {
    Autocomplete,
    Button,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import {DatePickerInput} from "../components/DatePickerInput";


interface FilmOptionType {
    inputValue?: string;
    title: string;
    year?: number;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films: readonly FilmOptionType[] = [
    {title: 'The Shawshank Redemption', year: 1994},
    {title: 'The Godfather', year: 1972},
    {title: 'The Godfather: Part II', year: 1974},
    {title: 'The Dark Knight', year: 2008},
    {title: '12 Angry Men', year: 1957},
    {title: "Schindler's List", year: 1993},
    {title: 'Pulp Fiction', year: 1994},
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    {title: 'The Good, the Bad and the Ugly', year: 1966},
    {title: 'Fight Club', year: 1999},
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    {title: 'Forrest Gump', year: 1994},
    {title: 'Inception', year: 2010},
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    {title: "One Flew Over the Cuckoo's Nest", year: 1975},
    {title: 'Goodfellas', year: 1990},
    {title: 'The Matrix', year: 1999},
    {title: 'Seven Samurai', year: 1954},
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    {title: 'City of God', year: 2002},
    {title: 'Se7en', year: 1995},
    {title: 'The Silence of the Lambs', year: 1991},
    {title: "It's a Wonderful Life", year: 1946},
    {title: 'Life Is Beautiful', year: 1997},
    {title: 'The Usual Suspects', year: 1995},
    {title: 'Léon: The Professional', year: 1994},
    {title: 'Spirited Away', year: 2001},
    {title: 'Saving Private Ryan', year: 1998},
    {title: 'Once Upon a Time in the West', year: 1968},
    {title: 'American History X', year: 1998},
    {title: 'Interstellar', year: 2014},
    {title: 'Casablanca', year: 1942},
    {title: 'City Lights', year: 1931},
    {title: 'Psycho', year: 1960},
    {title: 'The Green Mile', year: 1999},
    {title: 'The Intouchables', year: 2011},
    {title: 'Modern Times', year: 1936},
    {title: 'Raiders of the Lost Ark', year: 1981},
    {title: 'Rear Window', year: 1954},
    {title: 'The Pianist', year: 2002},
    {title: 'The Departed', year: 2006},
    {title: 'Terminator 2: Judgment Day', year: 1991},
    {title: 'Back to the Future', year: 1985},
    {title: 'Whiplash', year: 2014},
    {title: 'Gladiator', year: 2000},
    {title: 'Memento', year: 2000},
    {title: 'The Prestige', year: 2006},
    {title: 'The Lion King', year: 1994},
    {title: 'Apocalypse Now', year: 1979},
    {title: 'Alien', year: 1979},
    {title: 'Sunset Boulevard', year: 1950},
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    {title: 'The Great Dictator', year: 1940},
    {title: 'Cinema Paradiso', year: 1988},
    {title: 'The Lives of Others', year: 2006},
    {title: 'Grave of the Fireflies', year: 1988},
    {title: 'Paths of Glory', year: 1957},
    {title: 'Django Unchained', year: 2012},
    {title: 'The Shining', year: 1980},
    {title: 'WALL·E', year: 2008},
    {title: 'American Beauty', year: 1999},
    {title: 'The Dark Knight Rises', year: 2012},
    {title: 'Princess Mononoke', year: 1997},
    {title: 'Aliens', year: 1986},
    {title: 'Oldboy', year: 2003},
    {title: 'Once Upon a Time in America', year: 1984},
    {title: 'Witness for the Prosecution', year: 1957},
    {title: 'Das Boot', year: 1981},
    {title: 'Citizen Kane', year: 1941},
    {title: 'North by Northwest', year: 1959},
    {title: 'Vertigo', year: 1958},
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    {title: 'Reservoir Dogs', year: 1992},
    {title: 'Braveheart', year: 1995},
    {title: 'M', year: 1931},
    {title: 'Requiem for a Dream', year: 2000},
    {title: 'Amélie', year: 2001},
    {title: 'A Clockwork Orange', year: 1971},
    {title: 'Like Stars on Earth', year: 2007},
    {title: 'Taxi Driver', year: 1976},
    {title: 'Lawrence of Arabia', year: 1962},
    {title: 'Double Indemnity', year: 1944},
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    {title: 'Amadeus', year: 1984},
    {title: 'To Kill a Mockingbird', year: 1962},
    {title: 'Toy Story 3', year: 2010},
    {title: 'Logan', year: 2017},
    {title: 'Full Metal Jacket', year: 1987},
    {title: 'Dangal', year: 2016},
    {title: 'The Sting', year: 1973},
    {title: '2001: A Space Odyssey', year: 1968},
    {title: "Singin' in the Rain", year: 1952},
    {title: 'Toy Story', year: 1995},
    {title: 'Bicycle Thieves', year: 1948},
    {title: 'The Kid', year: 1921},
    {title: 'Inglourious Basterds', year: 2009},
    {title: 'Snatch', year: 2000},
    {title: '3 Idiots', year: 2009},
    {title: 'Monty Python and the Holy Grail', year: 1975},
];


interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'code', label: 'ISO\u00a0Code', minWidth: 100},
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}


function createData(
    name: string,
    code: string,
    population: number,
    size: number,
): Data {
    const density = population / size;
    return {name, code, population, size, density};
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),

];


const filter = createFilterOptions<FilmOptionType>();

export const Receipt = () => {

    const [value, setValue] = React.useState<FilmOptionType | null>(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setDialogValue({
            title: '',
            year: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        title: '',
        year: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            title: dialogValue.title,
            year: parseInt(dialogValue.year, 10),
        });
        handleClose();
    };

    // ----------------------------------------------- TABLE
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
            <Header category="page" title="Receipt"/>
            <div className="flex flex-wrap justify-center">
                <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl pb-6 mb-3">
                    <div className="mt-1 ">

                        <Paper sx={{width: '100%', overflow: 'hidden'}}>
                            <TableContainer sx={{maxHeight: 600}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{minWidth: column.minWidth}}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>

                <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                    <div className="flex justify-start">

                        <label>
                            <span className="text-gray-400">Pick expense date: </span>
                            <DatePickerInput/>
                        </label>
                    </div>

                    <div className="flex flex-wrap justify-start pt-5 pr-3">
                        <div className="pr-3 pb-3">
                            <React.Fragment>
                                <label>
                                    <span className="text-gray-400">Product: </span>
                                    <Autocomplete
                                        value={value}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                // timeout to avoid instant validation of the dialog's form.
                                                setTimeout(() => {
                                                    toggleOpen(true);
                                                    setDialogValue({
                                                        title: newValue,
                                                        year: '',
                                                    });
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                toggleOpen(true);
                                                setDialogValue({
                                                    title: newValue.inputValue,
                                                    year: '',
                                                });
                                            } else {
                                                setValue(newValue);
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    title: `Add "${params.inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        id="free-solo-dialog-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => {
                                            // e.g value selected with enter, right from the input
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            return option.title;
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                        sx={{width: 300}}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label=""/>}
                                    />
                                </label>


                                {/*<Dialog open={open} onClose={handleClose}>*/}
                                {/*    <form onSubmit={handleSubmit}>*/}
                                {/*        <DialogTitle>Add a new product</DialogTitle>*/}
                                {/*        <DialogContent>*/}
                                {/*            <DialogContentText>*/}
                                {/*                Did you miss any product in our list? Please, add it!*/}
                                {/*            </DialogContentText>*/}
                                {/*            <TextField*/}
                                {/*                autoFocus*/}
                                {/*                margin="dense"*/}
                                {/*                id="name"*/}
                                {/*                value={dialogValue.title}*/}
                                {/*                onChange={(event) =>*/}
                                {/*                    setDialogValue({*/}
                                {/*                        ...dialogValue,*/}
                                {/*                        title: event.target.value,*/}
                                {/*                    })*/}
                                {/*                }*/}
                                {/*                label="title"*/}
                                {/*                type="text"*/}
                                {/*                variant="standard"*/}
                                {/*            />*/}
                                {/*            <TextField*/}
                                {/*                margin="dense"*/}
                                {/*                id="name"*/}
                                {/*                value={dialogValue.year}*/}
                                {/*                onChange={(event) =>*/}
                                {/*                    setDialogValue({*/}
                                {/*                        ...dialogValue,*/}
                                {/*                        year: event.target.value,*/}
                                {/*                    })*/}
                                {/*                }*/}
                                {/*                label="year"*/}
                                {/*                type="number"*/}
                                {/*                variant="standard"*/}
                                {/*            />*/}
                                {/*        </DialogContent>*/}
                                {/*        <DialogActions>*/}
                                {/*            <Button onClick={handleClose}>Cancel</Button>*/}
                                {/*            <Button type="submit">Add</Button>*/}
                                {/*        </DialogActions>*/}
                                {/*    </form>*/}
                                {/*</Dialog>*/}
                            </React.Fragment>
                        </div>

                        <div className="pr-3 pb-3">
                            <React.Fragment>
                                <label>
                                    <span className="text-gray-400">Price: </span>
                                    <Autocomplete
                                        value={value}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                // timeout to avoid instant validation of the dialog's form.
                                                setTimeout(() => {
                                                    toggleOpen(true);
                                                    setDialogValue({
                                                        title: newValue,
                                                        year: '',
                                                    });
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                toggleOpen(true);
                                                setDialogValue({
                                                    title: newValue.inputValue,
                                                    year: '',
                                                });
                                            } else {
                                                setValue(newValue);
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    title: `Add "${params.inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        id="free-solo-dialog-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => {
                                            // e.g value selected with enter, right from the input
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            return option.title;
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                        sx={{width: 300}}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label=""/>}
                                    />
                                </label>


                                {/*<Dialog open={open} onClose={handleClose}>*/}
                                {/*    <form onSubmit={handleSubmit}>*/}
                                {/*        <DialogTitle>Add a new film</DialogTitle>*/}
                                {/*        <DialogContent>*/}
                                {/*            <DialogContentText>*/}
                                {/*                Did you miss any film in our list? Please, add it!*/}
                                {/*            </DialogContentText>*/}
                                {/*            <TextField*/}
                                {/*                autoFocus*/}
                                {/*                margin="dense"*/}
                                {/*                id="name"*/}
                                {/*                value={dialogValue.title}*/}
                                {/*                onChange={(event) =>*/}
                                {/*                    setDialogValue({*/}
                                {/*                        ...dialogValue,*/}
                                {/*                        title: event.target.value,*/}
                                {/*                    })*/}
                                {/*                }*/}
                                {/*                label="title"*/}
                                {/*                type="text"*/}
                                {/*                variant="standard"*/}
                                {/*            />*/}
                                {/*            <TextField*/}
                                {/*                margin="dense"*/}
                                {/*                id="name"*/}
                                {/*                value={dialogValue.year}*/}
                                {/*                onChange={(event) =>*/}
                                {/*                    setDialogValue({*/}
                                {/*                        ...dialogValue,*/}
                                {/*                        year: event.target.value,*/}
                                {/*                    })*/}
                                {/*                }*/}
                                {/*                label="year"*/}
                                {/*                type="number"*/}
                                {/*                variant="standard"*/}
                                {/*            />*/}
                                {/*        </DialogContent>*/}
                                {/*        <DialogActions>*/}
                                {/*            <Button onClick={handleClose}>Cancel</Button>*/}
                                {/*            <Button type="submit">Add</Button>*/}
                                {/*        </DialogActions>*/}
                                {/*    </form>*/}
                                {/*</Dialog>*/}
                            </React.Fragment>
                        </div>

                        <div className="pr-3 pb-3">
                            <React.Fragment>
                                <label>
                                    <span className="text-gray-400">Category: </span>
                                    <Autocomplete
                                        value={value}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                // timeout to avoid instant validation of the dialog's form.
                                                setTimeout(() => {
                                                    toggleOpen(true);
                                                    setDialogValue({
                                                        title: newValue,
                                                        year: '',
                                                    });
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                toggleOpen(true);
                                                setDialogValue({
                                                    title: newValue.inputValue,
                                                    year: '',
                                                });
                                            } else {
                                                setValue(newValue);
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    title: `Add "${params.inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        id="free-solo-dialog-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => {
                                            // e.g value selected with enter, right from the input
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            return option.title;
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                        sx={{width: 300}}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label=""/>}
                                    />
                                </label>


                                {/*<Dialog open={open} onClose={handleClose}>*/}
                                {/*    <form onSubmit={handleSubmit}>*/}
                                {/*        <DialogTitle>Add a new film</DialogTitle>*/}
                                {/*        <DialogContent>*/}
                                {/*            <DialogContentText>*/}
                                {/*                Did you miss any film in our list? Please, add it!*/}
                                {/*            </DialogContentText>*/}
                                {/*            <TextField*/}
                                {/*                autoFocus*/}
                                {/*                margin="dense"*/}
                                {/*                id="name"*/}
                                {/*                value={dialogValue.title}*/}
                                {/*                onChange={(event) =>*/}
                                {/*                    setDialogValue({*/}
                                {/*                        ...dialogValue,*/}
                                {/*                        title: event.target.value,*/}
                                {/*                    })*/}
                                {/*                }*/}
                                {/*                label="title"*/}
                                {/*                type="text"*/}
                                {/*                variant="standard"*/}
                                {/*            />*/}
                                {/*            <TextField*/}
                                {/*                margin="dense"*/}
                                {/*                id="name"*/}
                                {/*                value={dialogValue.year}*/}
                                {/*                onChange={(event) =>*/}
                                {/*                    setDialogValue({*/}
                                {/*                        ...dialogValue,*/}
                                {/*                        year: event.target.value,*/}
                                {/*                    })*/}
                                {/*                }*/}
                                {/*                label="year"*/}
                                {/*                type="number"*/}
                                {/*                variant="standard"*/}
                                {/*            />*/}
                                {/*        </DialogContent>*/}
                                {/*        <DialogActions>*/}
                                {/*            <Button onClick={handleClose}>Cancel</Button>*/}
                                {/*            <Button type="submit">Add</Button>*/}
                                {/*        </DialogActions>*/}
                                {/*    </form>*/}
                                {/*</Dialog>*/}
                            </React.Fragment>
                        </div>

                        <div className="pr-3 pb-3">
                            <React.Fragment>
                                <label>
                                    <span className="text-gray-400">Place: </span>
                                    <Autocomplete
                                        value={value}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                // timeout to avoid instant validation of the dialog's form.
                                                setTimeout(() => {
                                                    toggleOpen(true);
                                                    setDialogValue({
                                                        title: newValue,
                                                        year: '',
                                                    });
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                toggleOpen(true);
                                                setDialogValue({
                                                    title: newValue.inputValue,
                                                    year: '',
                                                });
                                            } else {
                                                setValue(newValue);
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    title: `Add "${params.inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        id="free-solo-dialog-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => {
                                            // e.g value selected with enter, right from the input
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            return option.title;
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                        sx={{width: 300}}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label=""/>}
                                    />
                                </label>


                                <Dialog open={open} onClose={handleClose}>
                                    <form onSubmit={handleSubmit}>
                                        <DialogTitle>Add a new place</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Did you miss any place in our list? Please, add it!
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                value={dialogValue.title}
                                                onChange={(event) =>
                                                    setDialogValue({
                                                        ...dialogValue,
                                                        title: event.target.value,
                                                    })
                                                }
                                                label="title"
                                                type="text"
                                                variant="standard"
                                            />
                                            <TextField
                                                margin="dense"
                                                id="name"
                                                value={dialogValue.year}
                                                onChange={(event) =>
                                                    setDialogValue({
                                                        ...dialogValue,
                                                        year: event.target.value,
                                                    })
                                                }
                                                label="year"
                                                type="number"
                                                variant="standard"
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button type="submit">Add</Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                            </React.Fragment>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};
